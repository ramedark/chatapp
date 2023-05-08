import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
  ChatComponent,
  ChatsComponent,
  StatusComponent,
  UsersComponent,
} from '../components';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    UsersComponent,
    ChatsComponent,
    StatusComponent,
    ChatComponent,
    AppComponent,
  ],
  imports: [BrowserModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
