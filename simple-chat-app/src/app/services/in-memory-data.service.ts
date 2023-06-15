import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { UserOverviewModel } from '../models/user-overview.model';
import { UserStatus } from '../modules/user-status.enum';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    return {
      UsersAndGroubs: [
        new UserOverviewModel(0, 'Rami Drkazoni(You)', UserStatus.Online),
        new UserOverviewModel(1, 'Bob Marly', UserStatus.Online),
        new UserOverviewModel(2, 'tosty tost', UserStatus.Offline),
        new UserOverviewModel(3, 'marlen monro', UserStatus.Offline),
        new UserOverviewModel(4, 'pinguen pingo', UserStatus.Busy),
      ],
    };
  }
}
