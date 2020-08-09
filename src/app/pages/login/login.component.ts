import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { WebSocketService } from '../../services/web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  }

  constructor(
    private webSocketService: WebSocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.webSocketService.login(this.user).then(() => {
      this.router.navigate(['message']);
    });
  }

}
