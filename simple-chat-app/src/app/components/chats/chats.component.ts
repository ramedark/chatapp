import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
// This component responsible for displaying chats and sending messages
export class ChatsComponent implements OnChanges {
  public messages: any[] = [];

  @Input() selectedChatId?: number;
  public selectedChat?: Chat;
  public newMessage = '';

  id: number = -1;

  constructor(private chatService: ChatService) {}

  ngOnChanges() {
    // Method called when changes are detected

    if (this.selectedChatId)
      this.selectedChat = this.chatService.getChatById(this.selectedChatId);
  }

  onSend() {
    this.chatService.sendMessage(this.selectedChat?.id ?? -1, this.newMessage);
    this.newMessage = '';
    // Method to send a message
  }

  getFirstLetters(name: string): string {
    const nameParts = name.split(' ');
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }
  // Method to return first letters of a name
}
