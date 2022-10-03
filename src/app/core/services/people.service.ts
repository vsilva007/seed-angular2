
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {PeopleFactory} from "../factories/PeopleFactory";
import {People} from "../models/people.model";
import {EmploymentFactory} from "../factories/EmploymentFactory";
import {Employment} from "../models/employment.model";
import {Conference} from "../models/conference.model";
import {ConferenceFactory} from "../factories/ConferenceFactory";


@Injectable()
export class PeopleService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'contact-list';

  getList(page: string = "0", pageSize: string = "10", fields: string = "", search: string = ""): Observable<People[]> {
    return this.http.get(this.basePath + '?' + 'page=' + page + '&pageSize=' + pageSize + '&fields=' + fields + '&search=' + search).map(this.parseResponseArray);
  }
  //
  // get(id: string): Observable<People> {
  //   return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  // }
  //
  // deleteObject(id: string): Observable<People> {
  //   return this.http.deleteCustom(this.basePath + '/' + id);
  // }
  //
  // create(contactList: People): Observable<People> {
  //   return this.http.post(this.basePath, contactList).map(this.parseResponseObject);
  // }
  //
  // update(contactList: People): Observable<People> {
  //   return this.http.put(this.basePath+ '/' + contactList.id, contactList).map(this.parseResponseObject);
  // }

  parseResponseArray(response){
    return PeopleFactory.createFromArray(response.data);
  }

  // parseResponseObject(response){
  //   return PeopleFactory.createFromObject(response);
  // }

  // Employment

  getEmploymentList(peopleId: string): Observable<Employment[]> {
    return this.http.get(this.basePath+ '/' + peopleId + '/employment').map(this.parseResponseEmploymentArray);
  }

  getEmployment(peopleId: string,id: string): Observable<Employment> {
    return this.http.get(this.basePath + '/' + peopleId + '/employment/' + id).map(this.parseResponseEmploymentObject);
  }

  deleteEmployment(peopleId: string,id: string): Observable<Employment> {
    return this.http.deleteCustom(this.basePath + '/' + peopleId + '/employment/' + id);
  }

  createEmployment(peopleId: string, employment: Employment): Observable<Employment> {
    return this.http.post(this.basePath+ '/' + peopleId + '/employment', employment).map(this.parseResponseEmploymentObject);
  }

  updateEmployment(peopleId: string, employment: Employment): Observable<Employment> {
    return this.http.put(this.basePath+ '/' + peopleId + '/employment/' + employment.id, employment).map(this.parseResponseEmploymentObject);
  }

  parseResponseEmploymentArray(response){
    return EmploymentFactory.createFromArray(response.data);
  }

  parseResponseEmploymentObject(response){
    return EmploymentFactory.createFromObject(response);
  }

  // Conference

  getConferenceList(peopleId: string): Observable<Conference[]> {
    return this.http.get(this.basePath+ '/' + peopleId + '/conference').map(this.parseResponseConferenceArray);
  }

  // getConference(contactListId: string,id: string): Observable<Conference> {
  //   return this.http.get(this.basePath + '/' + contactListId + '/conference/' + id).map(this.parseResponseConferenceObject);
  // }

  deleteConference(peopleId: string,id: string): Observable<Conference> {
    return this.http.deleteCustom(this.basePath + '/' + peopleId + '/conference/' + id);
  }

  createConference(peopleId: string, conference: Conference): Observable<Conference> {
    return this.http.post(this.basePath+ '/' + peopleId + '/conference', conference).map(this.parseResponseConferenceObject);
  }

  setConference(peopleId: string, conference: Conference): Observable<Conference> {
    return this.http.post(this.basePath+ '/' + peopleId + '/conference' + '/' + conference.id, conference).map(this.parseResponseConferenceObject);
  }

  parseResponseConferenceArray(response){
    return ConferenceFactory.createFromArray(response.data);
  }

  parseResponseConferenceObject(response){
    return ConferenceFactory.createFromObject(response);
  }
}
