import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

  users: Observable<any>;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.users = this.chatService.getUsers();
    this.chatService.emitGetUsers();
    // this.chatService.getUsers().subscribe(response => console.log(response));
  }

}
