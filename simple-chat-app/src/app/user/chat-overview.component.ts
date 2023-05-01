import { Component, Input, OnInit } from '@angular/core';
import { UserStatus } from '../modules/user-status.enum';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() chatName: string = '';
  @Input() chatId: number = -1;

  public status: UserStatus = UserStatus.Offline;
  public lastMessage?: Message;
  public unread: boolean = false;

  public get statusClass(): string {
    switch (this.status) {
      case UserStatus.Online:
        return 'online';
      case UserStatus.Busy:
        return 'busy';
      case UserStatus.Offline:
        return 'offline';
      default:
        return '';
    }
  }

  public get initials(): string {
    const nameParts = this.chatName.split(' ');
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }

  ngOnInit(): void {
    //todo get from service and update
    if (Math.random() > 0.5) {
      this.lastMessage = new Message('test 123', new Date());
      this.unread = true;
    }

    //todo get from service and update
    const val = Math.random();
    if (val < 0.3) {
      this.status = UserStatus.Offline;
    } else if (val < 0.6) {
      this.status = UserStatus.Busy;
    } else {
      this.status = UserStatus.Online;
    }
  }
}
