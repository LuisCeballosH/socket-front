import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private webSocketService: WebSocketService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (this.webSocketService.user.value) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }


}
