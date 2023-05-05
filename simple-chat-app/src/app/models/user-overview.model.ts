import { UserStatus } from '../modules/user-status.enum';

export class UserOverviewModel {
  public id!: number;
  public name!: string;
  public status!: UserStatus;
  // public get Initials()

  constructor(id: number, name: string, status: UserStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}

export class MessageModel {
  public content!: string;
  public date!: Date;
}
