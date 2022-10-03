
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {Conference} from "../models/conference.model";
import {ConferenceFactory} from "../factories/ConferenceFactory";


@Injectable()
export class ConferenceService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'conference';

  getList(page: string = "0", pageSize: string = "10", fields: string = "", search: string = ""): Observable<Conference[]> {
    return this.http.get(this.basePath + '?' + 'page=' + page + '&pageSize=' + pageSize + '&fields=' + fields + '&search=' + search).map(this.parseResponseArray);
  }

  get(id: string): Observable<Conference> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  delete(id: string): Observable<Conference> {
    return this.http.deleteCustom(this.basePath + '/' + id);
  }

  create(data: Conference): Observable<Conference> {
    return this.http.post(this.basePath, data).map(this.parseResponseObject);
  }

  update(data: Conference): Observable<Conference> {
    return this.http.put(this.basePath, data).map(this.parseResponseObject);
  }

  parseResponseArray(response){
    return ConferenceFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return ConferenceFactory.createFromObject(response);
  }
}
