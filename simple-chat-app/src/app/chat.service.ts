import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserStatus } from './modules/user-status.enum';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private users = [
    { id: 1, name: 'Alice', status: UserStatus.Online },
    { id: 2, name: 'Bob', status: UserStatus.Offline },
    { id: 3, name: 'Carol', status: UserStatus.Busy },
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
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      return;
    }

    const newMessage = { from: 'me', text: message };
    const currentChats = this.userMessages[userId] || [];
    currentChats.push(newMessage);
    this.userMessages[userId] = currentChats;

    this.messageReceived.next({ id: userId, message: newMessage });
  }

  changeMyStatus(status: UserStatus) {
    this.myStatus = status;
  }
}
