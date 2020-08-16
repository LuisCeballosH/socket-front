import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  status: boolean = false;

  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.getStatus();
    this.loadLocalStorage();
  }

  getStatus() {
    this.socket.on('connect', () => {
      console.log('connect server');
      this.status = true;
      this.loadLocalStorage();
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect server');
      this.status = false;
    });
  }

  emit(event: string, payload?: any, callback?: any) {
    this.socket.emit(event, payload, callback)
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  login(user: User) {
    return new Promise((resolve, reject) => {
      this.emit('settings-user', user, response => {
        console.log(user)
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        resolve();
      });
    })
  }

  logout() {
    this.user.next(null);
    localStorage.clear();
    const payload = {
      email: 'without name'
    }
    this.emit('settings-user', payload, () => { });
    this.router.navigate(['']);
  }

  // saveLocalStorage() {
  //   localStorage.setItem('user', JSON.stringify(this.user));
  // }

  loadLocalStorage() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user.next(JSON.parse(localStorage.getItem('user')));
      this.login(JSON.parse(localStorage.getItem('user')));
    }
  }
}
