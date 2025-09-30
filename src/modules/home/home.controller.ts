import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller({ path: 'home', version: '1' })
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get()
  async getHome() {
    return this.service.getHome();
  }
}
