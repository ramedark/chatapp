import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/models/chat.model';
import { UserStatus } from 'src/app/modules/user-status.enum';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() chat: Chat;
  @Input() selected: boolean = false;

  public status: UserStatus = UserStatus.Offline;

  constructor() {
    this.chat = new Chat(0, [], [], false);
  }

  public get statusClass(): string {
    if (this.chat.isGroup) return 'hidden';
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
    const nameParts = this.chat.title.split(' ');
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }

  ngOnInit(): void {
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
