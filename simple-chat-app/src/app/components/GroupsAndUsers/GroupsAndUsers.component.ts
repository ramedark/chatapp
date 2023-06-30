import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserStatus } from 'src/app/modules/user-status.enum';
import { ChatService } from 'src/app/services/chat.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-GroupsAndUsers',
  templateUrl: './GroupsAndUsers.component.html',
  styleUrls: ['./GroupsAndUsers.component.scss'],
})
// This component responsible for displaying groups and users
export class GroupAndUsersComponent implements OnInit {
  public chats: Array<Chat> = [];

  selectedChatId: number = -1;

  // Emitter for the selected chat
  @Output('selectedChat') selectedChatEmitter = new EventEmitter<number>();

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
    this.chatService.getAllChats().subscribe((chats) => {
      this.chats = chats;
    });

    this.users = this.chatService.getUsersChats();

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
  // Method to return a CSS class based on user status

  getFirstLetters(name: string): string {
    const nameParts = name.split(' ');
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }
  // Method to return first letters of a name

  onSubmit() {
    if (this.newGroupForm.valid) {
      const groupParticipants = this.newGroupForm.value.users
        ?.map((checked, index) => (checked ? this.users[index].id : null))
        .filter((el) => el !== null) as [];

      this.chatService.createChat(
        groupParticipants,
        true,
        this.newGroupForm.value.groupName as string
      );
      // Method to submit a new group form
    }
  }

  toggleGroupForm() {
    this.newGroupFormVisible = !this.newGroupFormVisible;
    // Method to toggle the visibility of the new group form
  }
  onChatClick(chatId: number) {
    this.selectedChatEmitter.emit(chatId);
    this.selectedChatId = chatId;
    // Method to handle chat selection
  }
}
