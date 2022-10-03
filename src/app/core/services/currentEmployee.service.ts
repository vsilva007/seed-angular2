
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {CurrentEmployee} from "../models/currentEmployee.model";
import {CurrentEmployeeFactory} from "../factories/CurrentEmployeeFactory";


@Injectable()
export class CurrentEmployeeService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'currentemployee';

  getList(): Observable<CurrentEmployee[]> {
    return this.http.get(this.basePath).map(this.parseResponseArray);
  }

  get(id: string): Observable<CurrentEmployee> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  remove(id: string): Observable<CurrentEmployee> {
    return this.http.deleteCustom(this.basePath + '/' + id);
  }

  create(data: CurrentEmployee): Observable<CurrentEmployee> {
    return this.http.post(this.basePath, data).map(this.parseResponseObject);
  }

  update(data: CurrentEmployee): Observable<CurrentEmployee> {
    return this.http.put(this.basePath, data).map(this.parseResponseObject);
  }

  parseResponseArray(response){
    return CurrentEmployeeFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return CurrentEmployeeFactory.createFromObject(response);
  }
}
