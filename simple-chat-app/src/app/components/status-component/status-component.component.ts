import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UserStatus } from '../../modules/user-status.enum';
@Component({
  selector: 'app-status-component',
  templateUrl: './status-component.component.html',
  styleUrls: ['./status-component.component.scss'],
})
export class StatusComponent implements OnInit {
  UserStatus = UserStatus;
  currentStatus!: UserStatus;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.currentStatus = this.chatService.myStatus;
  }

  onChangeStatus(status: UserStatus) {
    this.chatService.changeMyStatus(status);
    this.currentStatus = status;
  }
}
