
import { Industry } from '../models/index';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {IndustryFactory} from "../factories/IndustryFactory";
import {CountryFactory} from "../factories/CountryFactory";
import {Country} from "../models/country.model";


@Injectable()
export class CountryService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'country';

  getList(): Observable<Country[]> {
    return this.http.get(this.basePath).map(this.parseResponseArray);
  }

  get(id: string): Observable<Country> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  // delete(id: string): Observable<Country> {
  //   return this.http.deleteCustom(this.basePath + '/' + id);
  // }
  //
  // create(data: Country): Observable<Country> {
  //   return this.http.post(this.basePath, data).map(this.parseResponseObject);
  // }
  //
  // update(data: Country): Observable<Country> {
  //   return this.http.put(this.basePath, data).map(this.parseResponseObject);
  // }

  parseResponseArray(response){
    return CountryFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return CountryFactory.createFromObject(response);
  }
}
