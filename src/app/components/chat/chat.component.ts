import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  message: string = '';
  messages: any[] = [];
  chat: Subscription;
  element: HTMLElement;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.element = document.querySelector('#chat-message');
    this.chat = this.chatService.get().subscribe(message => {
      console.log(message);
      this.messages.push(message);
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.chat.unsubscribe();
  }

  send() {
    if (this.message.trim().length <= 0) {
      return;
    }
    console.log(this.message);
    this.chatService.send(this.message);
    this.message = '';
  }

}
