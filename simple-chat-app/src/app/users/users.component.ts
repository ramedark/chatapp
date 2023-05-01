import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserStatus } from '../modules/user-status.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  UserStatus = UserStatus;
  showUsersList: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.users = this.chatService.getUsers();
    this.users.map((user) => (user.initials = this.getFirstLetters(user.name)));
  }

  onUserClick(userId: number) {
    this.chatService.setActiveUser(userId);
  }

  getStatusClass(status: UserStatus): string {
    switch (status) {
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

  sendHey(userId: number) {
    this.chatService.simulateIncomingMessage(userId, 'Hey');
  }

  getFirstLetters(name: string): string {
    const nameParts = name.split(' ');
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }
}
