import { Controller, Get } from '@nestjs/common';
import { ClubsService } from './clubs.service';

@Controller({path: 'clubs', version: '1'})
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}


  @Get()
  findAll() {
    return this.clubsService.findAll();
  }
}
