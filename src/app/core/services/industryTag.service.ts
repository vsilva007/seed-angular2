import {Injectable} from "@angular/core";
import {HttpClient} from "./httpclient.service";
import {Observable} from "rxjs";
import {IndustryTag} from "../models/industryTag.model";
import {IndustryTagFactory} from "../factories/IndustryTagFactory";


@Injectable()
export class IndustryTagService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'industry';

  getList(industryId: string): Observable<IndustryTag[]> {
    return this.http.get(this.basePath + '/' + industryId + '/tag').map(this.parseResponseArray);
  }

  // get(id: string): Observable<IndustryTag> {
  //   return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  // }
  //
  // remove(id: string): Observable<IndustryTag> {
  //   return this.http.deleteCustom(this.basePath + '/' + id);
  // }
  //
  // create(data: IndustryTag): Observable<IndustryTag> {
  //   return this.http.post(this.basePath, data).map(this.parseResponseObject);
  // }
  //
  // update(data: IndustryTag): Observable<IndustryTag> {
  //   return this.http.put(this.basePath, data).map(this.parseResponseObject);
  // }

  parseResponseArray(response){
    return IndustryTagFactory.createFromArray(response.data);
  }

  parseResponseObject(response){
    return IndustryTagFactory.createFromObject(response);
  }
}
