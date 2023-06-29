import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  chats: Chat[] = [];
  selectedChatId: number | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.getChats();
    this.listenToChatChanges();
  }

  getChats(): void {
    this.chats = this.chatService.getAllChats();
  }

  listenToChatChanges(): void {
    this.chatService.onChatsChanged.subscribe(() => {
      this.getChats();
    });
  }

  selectChat(chat: Chat): void {
    this.selectedChatId = chat.id;
  }
  onChatClick(chatId: number): void {
    console.log(' click', chatId);
    this.selectedChatId = chatId;
  }
}
