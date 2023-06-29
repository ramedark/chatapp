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

  public onChatsChanged = new Subject<void>();

  constructor() {
    this.chats.set(1, new Chat(1, [this.users[0], this.users[1]], [], false));
    this.chats.set(2, new Chat(2, [this.users[1], this.users[2]], [], false));
    this.chats.set(
      3,
      new Chat(
        3,
        [this.users[2], this.users[3], this.users[2]],
        [],
        true,
        'group friends'
      )
    );
    this.chats.set(4, new Chat(4, [this.users[4], this.users[4]], [], false));
    this.randomMessage();
  }

  getAllChats(): Chat[] {
    const chatsArray: Chat[] = Array.from(this.chats.values());
    return chatsArray;
  }

  createChat(users: UserOverviewModel[], isGroup: boolean, title?: string) {
    const id = this.chats.size + 1; // Simple id generation.
    const newChat = new Chat(id, users, [], isGroup, title);
    this.chats.set(id, newChat);

    this.onChatsChanged.next();
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
    const id = this.chats.size + 1; // Simple id generation.
    const group = { id, name, userIds };
    this.chats.set(id, new Chat(id, [], [], true, name));
  }

  getGroups(): Chat[] {
    const groups: Chat[] = Array.from(this.chats.values()).filter(
      (chat) => chat.isGroup
    );
    return groups;
  }

  getUser(id: number): UserOverviewModel | undefined {
    return this.users.find((user) => user.id === id);
  }

  getChatById(id: number): Chat | undefined {
    return this.chats.get(id);
  }

  getUsersChats(): Chat[] {
    const usersChats: Chat[] = Array.from(this.chats.values()).filter(
      (chat) => !chat.isGroup
    );
    return usersChats;
  }

  getChatMessages(id: number): Message[] | undefined {
    const chat = this.chats.get(id);
    return chat?.messages;
  }

  sendMessage(chatId: number, message: string) {
    const newMessage = new Message('me', message, new Date());
    const chat = this.chats.get(chatId);
    chat?.messages.push(newMessage);
  }

  changeMyStatus(status: UserStatus) {
    this.myStatus = status;
  }
}
