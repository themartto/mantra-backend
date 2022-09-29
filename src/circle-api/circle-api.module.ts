import { Module } from '@nestjs/common';
import { CircleApiService } from './circle-api.service';

@Module({
  providers: [CircleApiService]
})
export class CircleApiModule {}
