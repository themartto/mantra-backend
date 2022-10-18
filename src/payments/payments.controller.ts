import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderDetails } from '../dto/order.details';
import { CircleApiService } from '../circle-api/circle-api.service';
import { CreateCardDetails } from '../dto/create.card';
import { ChargeCardDetails } from '../dto/charge.card';
import { PaymentsService } from './payments.service';
import { Client } from '../database/entities/client';
import { Payment } from '../database/entities/payment';
import { Chain } from '@circle-fin/circle-sdk';

@Controller('payments')
export class PaymentsController {
  constructor(
    readonly circleApi: CircleApiService,
    readonly paymentsService: PaymentsService,
  ) {
  }

  @Post('order')
  async order(@Body() orderDetails: OrderDetails) {
    const creditCardDetails: CreateCardDetails = {
      cardSecret: orderDetails.cardSecret,
      cardSecretKeyId: orderDetails.cardSecretKeyId,
      billingDetails: orderDetails.billingDetails,
      expMonth: orderDetails.expMonth,
      expYear: orderDetails.expYear,
      metadata: orderDetails.metadata,
    };

    const cardId = await this.circleApi.createCard(creditCardDetails);

    const user = new Client();
    user.keplrAddress = orderDetails.keplrAddress;

    await this.paymentsService.addClient(user);

    const chargeCardDetails: ChargeCardDetails = {
      amount: orderDetails.amount,
      cardId,
      cvvSecret: orderDetails.cvvSecret,
      cvvSecretKeyId: orderDetails.cvvSecretKeyId,
      description: orderDetails.description,
      metadata: orderDetails.metadata,
    };

    const chargeCardResponse = await this.circleApi.chargeCard(chargeCardDetails);

    // console.log(chargeCardResponse)
    const payment = new Payment();
    payment.paymentId = chargeCardResponse.data.id
    payment.status = chargeCardResponse.data.status
    payment.keplrAddress = user

    await this.paymentsService.addPayment(payment);
  }

  @Get(':id')
  async getPayment(@Param() params) {
    return this.paymentsService.getPayment(params.id)
  }

  @Post('transfer')
  async makeTransfer() {
    await this.circleApi.makeTransfer(
      '10.00',
      '0x86AF458B3a817d42Eece5D8afB10455e3Ca202d7',
      Chain.Eth,
      ''
    )
  }

  @Get('/get/publicKey')
  async returnPublicKey(): Promise<any> {
    return this.circleApi.getCirclePublicKey();
  }
}



