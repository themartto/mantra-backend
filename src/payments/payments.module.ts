import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CircleApiModule } from '../circle-api/circle-api.module';
import { CircleApiService } from '../circle-api/circle-api.service';
import { PaymentsStatusController } from './payments.status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../database/entities/payment';
import { Client } from '../database/entities/client';
import { ClientsController } from './clients.controller';

@Module({
  imports: [CircleApiModule, TypeOrmModule.forFeature([Client, Payment])],
  controllers: [ClientsController, PaymentsController, PaymentsStatusController],
  providers: [PaymentsService, CircleApiService],
})
export class PaymentsModule {}
