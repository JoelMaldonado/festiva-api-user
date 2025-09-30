import { Controller, Get } from '@nestjs/common';
import { ClubsV2Service } from './clubs-v2.service';

@Controller({ path: 'clubs', version: '2' })
export class ClubsV2Controller {
  constructor(private readonly service: ClubsV2Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
