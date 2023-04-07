import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserStatus } from '../modules/user-status.enum';
import { UserOverviewModel } from '../models/user-overview.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private users: Array<UserOverviewModel> = [
    new UserOverviewModel(0, 'Rami Drkazoni(You)', UserStatus.Online),
    new UserOverviewModel(1, 'Bob marly', UserStatus.Online),
    new UserOverviewModel(2, 'Frenkie de Jong', UserStatus.Offline),
    new UserOverviewModel(3, 'Mark Rutte', UserStatus.Busy),
  ];

  public userChanged = new Subject<number>();
  public messageReceived = new Subject<any>();
  public myStatus = UserStatus.Online;

  private userMessages: { [userId: number]: any[] } = {};

  constructor() {}

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    return this.users.find((user) => user.id == id);
  }

  getUserChats(id: number) {
    return this.userMessages[id] ?? [];
  }

  setActiveUser(userId: number) {
    this.userChanged.next(userId);
  }

  sendMessage(userId: number, message: string) {
    const date = new Date();
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      return;
    }

    const newMessage = { from: 'me', text: message, date };
    const currentChats = this.userMessages[userId] || [];
    currentChats.unshift(newMessage);
    this.userMessages[userId] = currentChats;

    this.users[userId].setLastMessage(message);

    this.messageReceived.next({ id: userId, message: newMessage });
  }

  changeMyStatus(status: UserStatus) {
    this.myStatus = status;
  }

  simulateIncomingMessage(userId: number, message: string) {
    const date = new Date();
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      return;
    }
    const newMessage = { from: user.name, text: message, date };
    const currentChats = this.userMessages[userId] || [];
    currentChats.unshift(newMessage);
    this.userMessages[userId] = currentChats;
    this.messageReceived.next({ id: userId, message: newMessage });
  }
}
