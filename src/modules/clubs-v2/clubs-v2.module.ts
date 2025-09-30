import { Module } from '@nestjs/common';
import { ClubsV2Service } from './clubs-v2.service';
import { ClubsV2Controller } from './clubs-v2.controller';

@Module({
  controllers: [ClubsV2Controller],
  providers: [ClubsV2Service],
})
export class ClubsV2Module {}
