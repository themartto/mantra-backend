import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CircleApiModule } from '../circle-api/circle-api.module';
import { CircleApiService } from '../circle-api/circle-api.service';
import { PaymentsStatusController } from './payments.status.controller';

@Module({
  imports: [CircleApiModule],
  controllers: [PaymentsController, PaymentsStatusController],
  providers: [PaymentsService, CircleApiService],
})
export class PaymentsModule {}
