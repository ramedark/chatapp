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
  ChatsListComponent,
} from '../components';
import { AppComponent } from '../app.component';
import { GroupOverviewComponent } from '../components/group-overview/group-overview.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ChatsComponent,
    StatusComponent,
    ChatComponent,
    AppComponent,
    GroupOverviewComponent,
    GroupAndUsersComponent,
    ChatsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
