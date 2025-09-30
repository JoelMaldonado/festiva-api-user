import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  async getHome() {
    const clubs = await this.prisma.club.findMany();
    const events = await this.prisma.event.findMany();
    const artists = await this.prisma.artist.findMany();
    return {
      success: true,
      message: 'Welcome to Festiva API',
      data: {
        clubs,
        events,
        artists,
      },
    };
  }
}
