import { Module } from '@nestjs/common';
import { CircleApiService } from './circle-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from '../database/entities/transfer';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer])],
  providers: [CircleApiService]
})
export class CircleApiModule {}
