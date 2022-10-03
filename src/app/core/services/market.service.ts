
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {MarketFactory} from "../factories/MarketFactory";
import {Market} from "../models/market.model";


@Injectable()
export class MarketService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'market';

  getList(): Observable<Market[]> {
    return this.http.get(this.basePath).map(this.parseResponseArray);
  }

  get(id: string): Observable<Market> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  // delete(id: string): Observable<Market> {
  //   return this.http.deleteCustom(this.basePath + '/' + id);
  // }
  //
  // create(data: Market): Observable<Market> {
  //   return this.http.post(this.basePath, data).map(this.parseResponseObject);
  // }
  //
  // update(data: Market): Observable<Market> {
  //   return this.http.put(this.basePath, data).map(this.parseResponseObject);
  // }

  parseResponseArray(response){
    return MarketFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return MarketFactory.createFromObject(response);
  }
}
