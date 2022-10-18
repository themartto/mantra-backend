import { Module } from '@nestjs/common';
import { EthersService } from './ethers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from '../database/entities/transfer';
import { MantrachainModule } from '../mantrachain/mantrachain.module';
import { MantrachainService } from '../mantrachain/mantrachain.service';

@Module({
  imports: [MantrachainModule, TypeOrmModule.forFeature([Transfer])],
  providers: [EthersService, MantrachainService]
})
export class EthersModule {}
