import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

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
      this.messages = this.chatService.getUserChats(this.id);
    });

    this.chatService.messageReceived.subscribe((data: any) => {
      if (data.id == this.id) {
        this.messages.push(data.message);
      }
    });
  }

  onSend() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.id, this.newMessage);
      this.newMessage = '';
    }
  }
}
