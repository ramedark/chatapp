import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.scss'],
})
export class GroupOverviewComponent implements OnInit {
  @Input() groupName!: string;
  @Input() groupId!: number;
  @Input() groupUserCount!: number;
  @Output()
  groupSelected = new EventEmitter<number>();

  constructor(private chatService: ChatService) {} // inject the service here

  ngOnInit(): void {}

  onGroupSelected() {
    console.log();
    this.groupSelected.emit(this.groupId);
    // Fetch the users from the service and log them
    const group = this.chatService.getGroup(this.groupId);
    const groupUsers = group
      ? group.userIds.map((userId) => this.chatService.getUser(userId))
      : [];
    console.log(groupUsers);
  }
}
