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
  @Input() selected: boolean = false;
  @Input() groupUserCount!: number;
  @Output()
  groupSelected = new EventEmitter<number>();

  constructor(private chatService: ChatService) {} // inject the service here

  ngOnInit(): void {}

  onGroupSelected() {}
}
