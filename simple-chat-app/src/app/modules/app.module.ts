import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../app.component';
import { UsersComponent } from '../users/users.component';
import { ChatsComponent } from '../chats/chats.component';
import { FormsModule } from '@angular/forms';
import { StatusComponent } from '../status-component/status-component.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, UsersComponent, ChatsComponent, StatusComponent],
  imports: [BrowserModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
