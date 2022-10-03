import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderDetails } from '../dto/order.details';
import { CircleApiService } from '../circle-api/circle-api.service';
import { v4 as uuidv4 } from 'uuid';
import {
    BillingDetails,
    CardCreationRequest,
    FiatMoneyUsd,
    MetadataPayment,
    PaymentCreationRequest,
    PaymentCreationRequestVerificationEnum,
    Source, SourceTypeEnum
} from '@circle-fin/circle-sdk';
import openpgp from '../utils/openpgp';

@Controller('payments')
export class PaymentsController {
    constructor(readonly circleApi: CircleApiService) {
    }

    @Post('order')
    async order(@Body() orderDetails: OrderDetails) {
        // ######### Save Card #############
        const publicKeyResp = await this.circleApi.circleApi.encryption.getPublicKey();
        const cardDetails = {
            number: orderDetails.cardNumber,
            cvv: orderDetails.cardCvv
        }
        const { encryptedMessage, keyId } = await openpgp.encrypt(cardDetails, publicKeyResp.data.data);

        const createCardPayload: CardCreationRequest = {
            idempotencyKey: uuidv4(),
            billingDetails: orderDetails.billingDetails,
            encryptedData: encryptedMessage,
            expMonth: parseInt(orderDetails.expMonth),
            expYear: parseInt(orderDetails.expYear),
            keyId,
            metadata: orderDetails.metadata
        }

        try {
            const createCardResp = await this.circleApi.circleApi.cards.createCard(createCardPayload);
            console.log(createCardResp.data.data.id);

            const amount: FiatMoneyUsd = {
                amount: orderDetails.amount,
                currency: 'USD'
            }

            const source: Source = {
                id: createCardResp.data.data.id,
                type: SourceTypeEnum.Card
            }

            const { encryptedMessage, keyId } = await openpgp.encrypt( { cvv: orderDetails.cardCvv }, publicKeyResp.data.data);

            const createPaymentPayload: PaymentCreationRequest = {
                idempotencyKey: uuidv4(),
                amount,
                verification: PaymentCreationRequestVerificationEnum.Cvv,
                source,
                description: orderDetails.description,
                channel: '',
                metadata: orderDetails.metadata as MetadataPayment,
                encryptedData: encryptedMessage,
                keyId: keyId,
                // autoCapture: false,
                // verificationFailureUrl: '',
                // verificationSuccessUrl: ''
            }

            const createPaymentResp = await this.circleApi.circleApi.payments.createPayment(createPaymentPayload)
            console.log(createPaymentResp)
        } catch (err) {
            console.log(err)
        }
    }

    @Get('public-key')
    async returnPublicKey() {
        const resp = await this.circleApi.circleApi.encryption.getPublicKey();

        return  resp.data.data;
    }
}



