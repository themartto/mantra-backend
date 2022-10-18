import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { CircleApiModule } from './circle-api/circle-api.module';
import { postgresProvider } from './database/postgres.provider';
import { EthersModule } from './ethers/ethers.module';
import { MantrachainModule } from './mantrachain/mantrachain.module';

@Module({
  imports: [PaymentsModule, CircleApiModule, postgresProvider, EthersModule, MantrachainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
