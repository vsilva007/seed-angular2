import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {AuthorizationService} from "./authorization.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var JSOG;



@Injectable()
export class HttpClient {
  static readonly DEV_PATH = 'http://localhost:9000';
  private http;
  private authorizationService: AuthorizationService;
  private baseUrl: string;
  constructor(http: Http, authorizationService: AuthorizationService) {
    this.http = http;
    this.authorizationService = authorizationService;
    this.baseUrl = HttpClient.DEV_PATH + "/api/";
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
     if (this.authorizationService.isAuthenticated()) {
       headers.append('auth-token', this.authorizationService.getCurrentToken());
     }
  }

  get(url: string) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.intercept(this.http.get(url, {
      headers: headers
    }).map(this.extractData));
  }

  deleteCustom(url: string) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.intercept(this.http.delete(url, {
      headers: headers
    }).map(this.extractData));
  }

  post(url: string, data: any) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.intercept(this.http.post(url, JSOG.stringify(data), {
      headers: headers
    }).map(this.extractData));
  }

  put(url: string, data: any) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.intercept(this.http.put(url, JSOG.stringify(data), {
      headers: headers
    }).map(this.extractData));
  }

  private extractData(res: Response) {
    let string = res.text();
    let body = JSOG.parse(string);
    return body || {};
  }

  intercept(observable: Observable<any>) {
    return observable.catch(err => {
      if (err.status === 401) {
        return this.unauthorised();
      } else {
        let body: {code: string, message: string} = JSOG.parse(err._body);
        console.error(body);
        return Observable.throw(body.message);
      }
    });
  }

  unauthorised(): Observable<any>
  {
    this.authorizationService.logout();
    return Observable.empty();
  }

  // private parseError(res: any): any{
  //   let string = res.text();
  //   let body = JSOG.parse(string);
  //   return body || {};
  // }
}
