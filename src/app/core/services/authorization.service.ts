
import {Injectable} from "@angular/core";
import {Session, User} from "../models/index";
import { Router } from '@angular/router';
import {Role} from "../models/user.model";
declare var JSOG;

@Injectable()
export class AuthorizationService {

  private localStorageService;
  private currentSession : Session = null;
  private FCMToken : string = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    this.FCMToken = this.loadFCMToken();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSOG.stringify(session));
  }

  loadSessionData(){
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? JSOG.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  setFCMToken(token: string): void{
    this.FCMToken = token;
    this.localStorageService.setItem('fcmToken', token);
  }

  loadFCMToken() : string{
    var token = this.localStorageService.getItem('fcmToken');
    return (token) ? token : null;
  }

  getFCMToken() : string{
    return this.FCMToken;
  }

  getUserRoles() : Role[]{
    return this.currentSession.user.role;
  }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
