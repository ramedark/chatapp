import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
  ChatComponent,
  ChatsComponent,
  StatusComponent,
  UsersComponent,
} from '../components';
import { AppComponent } from '../app.component';
import { GroupOverviewComponent } from '../group-overview/group-overview.component';

@NgModule({
  declarations: [
    UsersComponent,
    ChatsComponent,
    StatusComponent,
    ChatComponent,
    AppComponent,
    GroupOverviewComponent,
  ],
  imports: [BrowserModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
