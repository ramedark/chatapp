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
    new UserOverviewModel(1, 'Bob Marly', UserStatus.Online),
    new UserOverviewModel(2, 'tosty tost', UserStatus.Offline),
    new UserOverviewModel(3, 'marlen monro', UserStatus.Offline),
    new UserOverviewModel(4, 'pinguen pingo', UserStatus.Busy),
  ];

  public userChanged = new Subject<number>();
  public groupChanged = new Subject<number>();

  public messageReceived = new Subject<any>();
  public myStatus = UserStatus.Online;

  private userMessages: { [userId: number]: any[] } = {};
  private groupMessages: { [groupId: number]: any[] } = {};

  public groups: Array<{ id: number; name: string; userIds: number[] }> = [
    { id: 0, name: 'first group', userIds: [0, 1] },
  ];

  constructor() {
    this.randomMessage();
  }

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    return this.users.find((user) => user.id == id);
  }

  getUserChats(id: number) {
    return this.userMessages[id] ?? [];
  }

  getGroupChats(groupId: number) {
    return this.groupMessages[groupId] ?? [];
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
    currentChats.push(newMessage);
    this.userMessages[userId] = currentChats;

    this.messageReceived.next({ id: userId, message: newMessage });
  }

  sendMessageToGroup(groupId: number, message: string) {
    const date = new Date();
    const group = this.groups.find((g) => g.id === groupId);
    if (!group) {
      return;
    }
    const newMessage = { from: 'me', text: message, date };
    const currentChats = this.groupMessages[groupId] || [];
    currentChats.push(newMessage);
    this.groupMessages[groupId] = currentChats;

    this.messageReceived.next({ id: groupId, message: newMessage });
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
    currentChats.push(newMessage);
    this.userMessages[userId] = currentChats;
    this.messageReceived.next({ id: userId, message: newMessage });
  }

  randomMessage() {
    setInterval(() => {
      const randomUserId = Math.floor(Math.random() * this.users.length);
      const randomMessage = Math.random().toString(36).substring(7);
      this.simulateIncomingMessage(randomUserId, randomMessage);
    }, 10000);
  }

  createGroup(name: string, userIds: number[]) {
    const id = this.groups.length; // Simple id generation.
    const group = { id, name, userIds };
    this.groups.push(group);
  }

  getGroups() {
    return this.groups;
  }

  getGroup(id: number) {
    return this.groups.find((group) => group.id === id);
  }

  setActiveGroup(groupId: number) {
    this.groupChanged.next(groupId);
  }
}
