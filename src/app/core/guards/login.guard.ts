
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthorizationService} from "../services/authorization.service";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authorization: AuthorizationService) { }

  canActivate() {
    console.log(this.authorization.isAuthenticated());
    if (this.authorization.isAuthenticated()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
