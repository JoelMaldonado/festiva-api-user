import { Injectable } from '@nestjs/common';

@Injectable()
export class ClubsV2Service {
  findAll() {
    return [
      { id: 3, name: 'Chess Club' },
      { id: 4, name: 'Book Club' },
    ];
  }
}
