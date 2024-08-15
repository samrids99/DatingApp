import { Component, Input, OnInit } from '@angular/core';
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
  @Input() username?: string;
  messages: Message[] = [];

  constructor (private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    if (this.username) {
      this.messageService.getMessageThread(this.username).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

}
