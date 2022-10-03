
import { User } from '../models/index';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {UserFactory} from "../factories/UserFactory";
import {Response} from "@angular/http";
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,) {
  }

  private basePath = 'useraccount';

  getUsers(): Observable<User[]> {
    return this.http.get(this.basePath).map(this.parseResponseArray);
  }

  getUser(id: string): Observable<User> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.deleteCustom(this.basePath + '/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post(this.basePath, user).map(this.parseResponseObject);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.basePath, user).map(this.parseResponseObject);
  }

  parseResponseArray(response){
    return UserFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return UserFactory.createFromObject(response);
  }
}
