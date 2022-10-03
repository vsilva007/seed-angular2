
import { Office } from '../models/index';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {OfficeFactory} from "../factories/OfficeFactory";


@Injectable()
export class OfficeService {

  constructor(private http: HttpClient) {

  }

  private basePath = 'company';

  getList(companyId: string): Observable<Office[]> {
    return this.http.get(this.basePath+ '/' + companyId + '/office').map(this.parseResponseArray);
  }

  get(companyId: string,id: string): Observable<Office> {
    return this.http.get(this.basePath + '/' + companyId + '/office/' + id).map(this.parseResponseObject);
  }

  deleteObject(companyId: string,id: string): Observable<Office> {
    return this.http.deleteCustom(this.basePath + '/' + companyId + '/office/' + id);
  }

  create(companyId: string, office: Office): Observable<Office> {
    return this.http.post(this.basePath+ '/' + companyId + '/office', office).map(this.parseResponseObject);
  }

  update(companyId: string, office: Office): Observable<Office> {
    return this.http.put(this.basePath+ '/' + companyId + '/office/' + office.id, office).map(this.parseResponseObject);
  }

  parseResponseArray(response){
    return OfficeFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return OfficeFactory.createFromObject(response);
  }
}
