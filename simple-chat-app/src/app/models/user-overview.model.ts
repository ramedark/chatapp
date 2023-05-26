import { UserStatus } from '../modules/user-status.enum';

export class UserOverviewModel {
  public id: number;
  public name!: string;
  public status!: UserStatus;
  // public get Initials()
  public lastMessage: string;
  public isGroup: boolean = false;
  constructor(
    id: number,
    name: string,
    status: UserStatus,
    lastMessage?: string
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.lastMessage = lastMessage ?? '';
  }
}

export class MessageModel {
  public content!: string;
  public date!: Date;
}
