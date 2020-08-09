import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private webSocketService: WebSocketService) { }

  send(message) {
    const payload = {
      user: this.webSocketService.user.value.email,
      message
    }

    this.webSocketService.emit('message', payload);
  }

  get() {
    return this.webSocketService.listen('new-message');
  }

  messagePrivate() {
    return this.webSocketService.listen('private-message');
  }
}
