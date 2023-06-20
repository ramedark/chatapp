import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserStatus } from 'src/app/modules/user-status.enum';
import { ChatService } from 'src/app/services/chat.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserOverviewModel } from 'src/app/models/user-overview.model';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-GroupsAndUsers',
  templateUrl: './GroupsAndUsers.component.html',
  styleUrls: ['./GroupsAndUsers.component.scss'],
})
export class GroupAndUsersComponent implements OnInit {
  public chats: Array<Chat> = [];
  @Output() selectedChat = new EventEmitter<number>();

  users: Chat[] = [];
  groups: Chat[] = [];

  UserStatus = UserStatus;
  showUsersList: boolean = false;
  // Declare newGroupForm property
  newGroupFormVisible: boolean = false; // Update the variable name
  newGroupForm!: FormGroup<{
    groupName: FormControl<string>;
    users: FormArray<FormControl<boolean>>;
  }>;
  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.users = this.chatService.getUsersChats();
    // this.users.map((user) => (user.initials = this.getFirstLetters(user.name)));
    const usersControl = this.users.map(
      (user) => new FormControl(false) as FormControl<boolean>
    );

    this.newGroupForm = new FormGroup({
      groupName: new FormControl('', [
        Validators.required,
      ]) as FormControl<string>,
      users: new FormArray(usersControl),
    });
    this.groups = this.chatService.getGroups();
  }

  onClickChat(chatId: number) {
    this.selectedChat.emit(chatId);
  }

  getStatusClass(status: UserStatus): string {
    switch (status) {
      case UserStatus.Online:
        return 'online';
      case UserStatus.Busy:
        return 'busy';
      case UserStatus.Offline:
        return 'offline';
      default:
        return '';
    }
  }

  getFirstLetters(name: string): string {
    const nameParts = name.split(' ');
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }

  onSubmit() {
    if (this.newGroupForm.valid) {
      console.log(this.newGroupForm.value.users);
      const groupParticipants = this.newGroupForm.value.users
        ?.map((checked, index) => (checked ? this.users[index].id : null))
        .filter((el) => el !== null) as [];
      console.log(groupParticipants);
      this.chatService.createGroup(
        this.newGroupForm.value.groupName as string,
        groupParticipants
      );
    }
  }

  toggleGroupForm() {
    this.newGroupFormVisible = !this.newGroupFormVisible;
  }
  onChatClick(chatId: number) {
    this.selectedChat.emit(chatId);
  }
}
