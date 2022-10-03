
import { Industry } from '../models/index';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {IndustryFactory} from "../factories/IndustryFactory";


@Injectable()
export class IndustryService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'industry';

  getCompanySectors(): Observable<Industry[]> {
    return this.http.get(this.basePath).map(this.parseResponseArray);
  }

  getCompanySector(id: string): Observable<Industry> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  deleteCompanySector(id: string): Observable<Industry> {
    return this.http.deleteCustom(this.basePath + '/' + id);
  }

  createCompanySector(data: Industry): Observable<Industry> {
    return this.http.post(this.basePath, data).map(this.parseResponseObject);
  }

  updateCompanySector(data: Industry): Observable<Industry> {
    return this.http.put(this.basePath, data).map(this.parseResponseObject);
  }

  parseResponseArray(response){
    return IndustryFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return IndustryFactory.createFromObject(response);
  }
}
