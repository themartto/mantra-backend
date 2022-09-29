import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { CircleApiModule } from './circle-api/circle-api.module';

@Module({
  imports: [PaymentsModule, CircleApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
