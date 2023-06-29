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
import { Message } from 'src/app/models/message.model';
import { UserStatus } from 'src/app/modules/user-status.enum';

import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() chatName: string = '';
  @Input() chat: Chat;

  @Input() chatId: number = -1;

  @Input() lastMessage?: Message;
  @Output() newMessageSound: EventEmitter<void> = new EventEmitter<void>();
  @Input() selected: boolean = false;
  @Input() title: string = '';

  public status: UserStatus = UserStatus.Offline;

  public unread: boolean = false;
  public showNewMessageDot: boolean = false;
  public messageSub!: Subscription;

  constructor(private chatService: ChatService) {
    this.chat = new Chat(0, [], [], false);
  }

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
    /// ask bart about it
    this.messageSub = this.chatService.messageReceived.subscribe((data) => {
      if (this.chatId == data.id) {
        this.lastMessage = data.message;
        this.showNewMessageDot = true;
        this.newMessageSound.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
  }

  public onChatClick(): void {
    this.showNewMessageDot = false;
  }
}
