
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Session} from "../models/session.model";
import {HttpClient} from "./httpclient.service";

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient) {
  }

  private basePath = 'authorize/';

  login(loginObj: any): Observable<Session> {
    return this.http.post(this.basePath + 'login', loginObj);
  }

  logOut(): Observable<Session> {
    return this.http.post(this.basePath + 'logout', {});
  }

  // login(username: string, password: string): Observable<boolean> {
  //   return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
  //     .map((response: Response) => {
  //       // login successful if there's a jwt token in the response
  //       debugger;
  //       let token = response.json() && response.json().token;
  //       if (!token) {
  //         // set token property
  //         this.token = token;
  //
  //         // store username and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
  //
  //         // return true to indicate successful login
  //         return true;
  //       } else {
  //         debugger;
  //         // return false to indicate failed login
  //         return false;
  //       }
  //     });
  // }

  // refreshToken(): Observable<Session> {
  //   return this.http.get(this.basePath + 'refreshToken');
  // }
}
