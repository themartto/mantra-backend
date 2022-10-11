import { Injectable } from '@nestjs/common';
import {
  CardCreationRequest, Chain,
  Circle,
  CircleEnvironments,
  FiatMoneyUsd, MetadataPayment, Money, PaymentCreationRequest, PaymentCreationRequestVerificationEnum,
  Source,
  SourceTypeEnum, TransferCreationRequest,
} from '@circle-fin/circle-sdk';
import { CreateCardDetails } from '../dto/create.card';
import openpgp from '../utils/openpgp';
import { v4 as uuidv4 } from 'uuid';
import { ChargeCardDetails } from '../dto/charge.card';
import { PublicKey } from '@circle-fin/circle-sdk/src/generated/models/public-key';

@Injectable()
export class CircleApiService {

  circleApi: Circle;

  constructor() {
    this.circleApi = new Circle(
      process.env.API_KEY,
      Boolean(process.env.DEV) ? CircleEnvironments.sandbox : CircleEnvironments.production,    // API base url
    );
  }

  async createCard(details: CreateCardDetails): Promise<string> {

    const cardDetails = {
      number: details.number,
      cvv: details.cvv,
    };
    const { encryptedMessage, keyId } = await openpgp.encrypt(
      cardDetails,
      await this.getCirclePublicKey(),
    );

    const createCardPayload: CardCreationRequest = {
      idempotencyKey: uuidv4(),
      billingDetails: details.billingDetails,
      encryptedData: encryptedMessage,
      expMonth: parseInt(details.expMonth),
      expYear: parseInt(details.expYear),
      keyId,
      metadata: details.metadata,
    };
    // TODO validate api call
    const createCardResp = await this.circleApi.cards.createCard(createCardPayload);

    return createCardResp.data.data.id;
  }

  async chargeCard(details: ChargeCardDetails): Promise<any> {
    const amount: FiatMoneyUsd = {
      amount: details.amount,
      currency: 'USD',
    };

    const source: Source = {
      id: details.cardId,
      type: SourceTypeEnum.Card,
    };

    const { encryptedMessage, keyId } = await openpgp.encrypt(
      { cvv: details.cardCvv },
      await this.getCirclePublicKey(),
    );

    const createPaymentPayload: PaymentCreationRequest = {
      idempotencyKey: uuidv4(),
      amount,
      verification: PaymentCreationRequestVerificationEnum.Cvv,
      source,
      description: details.description,
      channel: '',
      metadata: details.metadata,
      encryptedData: encryptedMessage,
      keyId: keyId,
      // autoCapture: false,
      // verificationFailureUrl: '',
      // verificationSuccessUrl: ''
    };

    const response = await this.circleApi.payments.createPayment(createPaymentPayload);

    return response.data;
  }

  async getCirclePublicKey(): Promise<PublicKey> {
    const publicKeyResp = await this.circleApi.encryption.getPublicKey();

    return publicKeyResp.data.data;
  }

  async makeTransfer(amount: string, address: string, chain: Chain) {
    const payload: TransferCreationRequest = {
      idempotencyKey: uuidv4(),
      amount: { amount, currency: 'USD' } as Money,
      source: {
        type: 'wallet',
        id: process.env.MASTER_WALLET_ID,
      },
      destination: {
        type: 'blockchain',
        address,
        chain,
      },
    };

    const resp = await this.circleApi.transfers.createTransfer(payload);
    console.log(resp.data)
    return resp.data;
  }
}
