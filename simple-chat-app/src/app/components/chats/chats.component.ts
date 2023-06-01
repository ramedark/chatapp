import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  public messages: any[] = [];
  public selectedUser: any = null;
  public newMessage = '';

  id: number = -1;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages = [];

    this.chatService.userChanged.subscribe((id) => {
      this.id = id;
      this.selectedUser = this.chatService.getUser(this.id);
      this.loadMessages();
    });

    this.chatService.groupChanged.subscribe((id) => {
      this.id = id;
      this.selectedUser = this.chatService.getGroup(this.id);
      this.loadMessages();
    });

    this.chatService.messageReceived.subscribe((data: any) => {
      if (data.id == this.id) {
        this.loadMessages();
      }
    });
  }

  loadMessages() {
    if (this.selectedUser) {
      this.messages = this.chatService.getUserChats(this.id);
    } else {
      this.messages = this.chatService.getGroupChats(this.id);
    }
  }

  onSend() {
    if (this.newMessage.trim()) {
      if (this.selectedUser) {
        this.chatService.sendMessage(this.id, this.newMessage);
      } else {
        this.chatService.sendMessageToGroup(this.id, this.newMessage);
      }
      this.newMessage = '';
    }
  }

  getFirstLetters(name: string): string {
    const nameParts = name.split(' ');
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }
}
