import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedChatId?: number;
  onSelectedChat(chatId: number) {
    this.selectedChatId = chatId;
  }

  title = 'simple-chat-app';
}
