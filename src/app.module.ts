import { Module } from '@nestjs/common';
import { EventsModule } from './modules/events/events.module';
import { ClubsModule } from './modules/clubs/clubs.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClubsV2Module } from './modules/clubs-v2/clubs-v2.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [EventsModule, ClubsModule, AuthModule, ClubsV2Module],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
