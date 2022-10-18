import { Module } from '@nestjs/common';
import { MantrachainService } from './mantrachain.service';

@Module({
  providers: [MantrachainService]
})
export class MantrachainModule {}
