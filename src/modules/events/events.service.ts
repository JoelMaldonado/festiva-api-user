import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      include: {
        event_category: true,
      },
    });
  }

  async findOne(id: number) {
    const ev = await this.prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        image_url: true,
        ticket_url: true,
        club: {
          select: {
            id: true,
            name: true,
            description: true,
            club_location: {
              take: 1,
              where: {
                status_id: 1,
              },
              select: {
                address: true,
              },
              orderBy: {
                id: 'desc',
              },
            },
          },
        },
        event_category: {
          select: {
            event_id: true,
            category_id: true,
            category: {
              select: {
                title: true,
              },
            },
          },
        },
        event_schedule: {
          where: {
            status_id: 1,
          },
          select: {
            id: true,
            event_date: true,
            start_time: true,
          },
        },
      },
    });

    if (!ev) {
      throw new NotFoundException('Event not found');
    }

    return ev;
  }
}
