import { All, Body, Controller } from '@nestjs/common';
import { CircleApiService } from '../circle-api/circle-api.service';
import { PaymentsService } from './payments.service';

@Controller('payments/status/update')
export class PaymentsStatusController {
  constructor(
    readonly paymentService: PaymentsService
  ) {}

  @All()
  async updatePaymentStatus(@Body() data: any) {
    await this.paymentService.updatePaymentStatus(
      'f18a43e0-c4c0-418d-b084-c5cf1e025f04',
      'confirmed'
    )
  }
}
