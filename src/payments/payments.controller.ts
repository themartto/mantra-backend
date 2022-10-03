import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderDetails } from '../dto/order.details';
import { CircleApiService } from '../circle-api/circle-api.service';
import { CreateCardDetails } from '../dto/create.card';
import { ChargeCardDetails } from '../dto/charge.card';

@Controller('payments')
export class PaymentsController {
    constructor(readonly circleApi: CircleApiService) {}

    @Post('order')
    async order(@Body() orderDetails: OrderDetails) {
        const creditCardDetails: CreateCardDetails = {
            number: orderDetails.cardNumber,
            cvv: orderDetails.cardCvv,
            billingDetails: orderDetails.billingDetails,
            expMonth: orderDetails.expMonth,
            expYear: orderDetails.expYear,
            metadata: orderDetails.metadata
        }

        const cardId = await this.circleApi.createCard(creditCardDetails);

        const chargeCardDetails: ChargeCardDetails = {
            amount: orderDetails.amount,
            cardId,
            cardCvv: orderDetails.cardCvv,
            description: orderDetails.description,
            metadata: orderDetails.metadata
        }

        const chargeCardResponse = await this.circleApi.chargeCard(chargeCardDetails);

        console.log(chargeCardResponse)
        // {
        //     data: {
        //         id: 'acbd7f88-5607-4990-8a28-d9195504ec78',
        //           type: 'payment',
        //           status: 'pending',
        //           description: 'Merchant Payment',
        //           amount: { amount: '100.00', currency: 'USD' },
        //         createDate: '2022-10-03T12:37:38.217Z',
        //           updateDate: '2022-10-03T12:37:38.217Z',
        //           merchantId: '3e855580-aa07-4a82-a050-e1eafda877da',
        //           merchantWalletId: '1001478095',
        //           source: { id: '42625b54-eb04-4ade-8e19-43da8182ed25', type: 'card' },
        //         refunds: [],
        //           metadata: { phoneNumber: '+359899999999', email: 'bob.bobz@bobo.com' }
        //     }
        // }

    }

    @Get('public-key')
    async returnPublicKey() {
        return this.circleApi.getCirclePublicKey();
    }
}



