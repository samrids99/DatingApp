import { Component, input, Input, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class MemberMessagesComponent implements OnInit {
  @Input() messages: Message[] = [];
  @Input() username?: string;

  constructor () { }

  ngOnInit(): void {
  }

  

}
