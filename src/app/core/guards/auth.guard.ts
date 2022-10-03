
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthorizationService} from "../services/authorization.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authorization: AuthorizationService) { }

  canActivate() {
    console.log(this.authorization.isAuthenticated());
    if (this.authorization.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
