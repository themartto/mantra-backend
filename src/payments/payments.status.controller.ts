import { All, Body, Controller } from '@nestjs/common';
import { CircleApiService } from '../circle-api/circle-api.service';

@Controller('payments/status/update')
export class PaymentsStatusController {
  constructor() {}

  @All()
  async updatePaymentStatus(@Body() data: any) {
    //TODO implement
  }
}
