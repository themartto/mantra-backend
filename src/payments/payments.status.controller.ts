import { All, Body, Controller, Req } from '@nestjs/common';
import { CircleApiService } from '../circle-api/circle-api.service';
import { PaymentsService } from './payments.service';

@Controller('statuses/payment/update')
export class PaymentsStatusController {
  constructor(
    readonly paymentService: PaymentsService,
    readonly circleApi: CircleApiService
  ) {}

  @All()
  async updatePaymentStatus(@Req() data: any) {
    console.log(data.body);
    // const z = JSON.parse(data.Message)
    // z.paymentId
    // z.status
    // await this.paymentService.updatePaymentStatus(
    //   'f18a43e0-c4c0-418d-b084-c5cf1e025f04',
    //   'confirmed'
    // )
    // this.circleApi.makeTransfer()
  }
}
