import { Message } from './message.model';
import { UserOverviewModel } from './user-overview.model';

export class Chat {
  id: number;
  users: UserOverviewModel[];
  messages: Message[];
  title: string;
  isGroup: boolean;
  lastMessage?: Message;

  constructor(
    id: number,
    users: UserOverviewModel[],
    messages: Message[],
    isGroup: boolean,
    title?: string
  ) {
    this.id = id;
    this.users = users;
    this.messages = messages;
    this.isGroup = isGroup;
    if (this.isGroup) {
      this.title = title ?? 'group';
    } else {
      this.title = this.users[0]?.name ?? 'empty';
    }
  }
}
