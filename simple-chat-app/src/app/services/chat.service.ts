import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserStatus } from '../modules/user-status.enum';
import { UserOverviewModel } from '../models/user-overview.model';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';

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
  private chats = new Map<number, Chat>();

  public messageReceived = new Subject<any>();
  public myStatus = UserStatus.Online;

  public groups: Array<{ id: number; name: string; userIds: number[] }> = [
    { id: 0, name: 'first group', userIds: [3, 1] },
  ];

  constructor() {
    this.chats.set(1, new Chat(1, [this.users[0], this.users[1]], [], false));
    this.chats.set(2, new Chat(2, [this.users[0], this.users[2]], [], false));
    this.chats.set(
      3,
      new Chat(
        3,
        [this.users[0], this.users[3], this.users[2]],
        [],
        true,
        'group friends'
      )
    );
    this.chats.set(4, new Chat(4, [this.users[0], this.users[4]], [], false));
    console.log(this.chats);
    this.randomMessage();
  }
  getChats() {
    return this.chats;
  }
  getUsersChats() {
    const users = [];
    for (const chat of this.chats.values()) {
      if (!chat.isGroup) users.push(chat);
    }
    return users;
  }

  getUser(id: number) {
    return this.users.find((user) => user.id == id);
  }

  getChatMesseges(id: number) {
    return this.chats.get(id)?.messages;
  }

  sendMessage(chatId: number, message: string) {
    const newMessage = {
      from: 'me',
      text: message,
      time: new Date(),
    };
    this.chats.get(chatId)?.messages.push(newMessage);
  }

  changeMyStatus(status: UserStatus) {
    this.myStatus = status;
  }

  simulateIncomingMessage(chatId: number, message: string) {
    const date = new Date();

    const newMessage = new Message('fromother', message, date);
    const chat = this.chats.get(chatId);
    chat?.messages.push(newMessage);
    chat!.lastMessage = newMessage;
  }

  randomMessage() {
    setInterval(() => {
      const chatId = Math.floor(Math.random() * this.chats.size + 1);
      const randomMessage = Math.random().toString(36).substring(7);
      this.simulateIncomingMessage(chatId, randomMessage);
    }, 1000);
  }

  createGroup(name: string, userIds: number[]) {
    const id = this.groups.length; // Simple id generation.
    const group = { id, name, userIds };
    this.groups.push(group);
  }

  getGroups() {
    const groups = [];
    for (const chat of this.chats.values()) {
      if (chat.isGroup) groups.push(chat);
    }
    return groups;
  }
  getChatById(id: number): Chat | undefined {
    return this.chats.get(id);
  }
}
//shoo ?
