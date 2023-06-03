import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
  ChatComponent,
  ChatsComponent,
  GroupAndUsersComponent,
  StatusComponent,
} from '../components';
import { AppComponent } from '../app.component';
import { GroupOverviewComponent } from '../components/group-overview/group-overview.component';

@NgModule({
  declarations: [
    ChatsComponent,
    StatusComponent,
    ChatComponent,
    AppComponent,
    GroupOverviewComponent,
    GroupAndUsersComponent,
  ],
  imports: [BrowserModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
