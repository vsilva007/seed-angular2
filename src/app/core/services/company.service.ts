
import { Company } from '../models/index';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {CompanyFactory} from "../factories/CompanyFactory";
import {PeopleFactory} from "../factories/PeopleFactory";
import {People} from "../models/people.model";
import {ContactList} from "../models/contact-list.model";


@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {

  }

  private basePath = 'company';

  getList(page: string = "0", pageSize: string = "10", fields: string = "", search: string = ""): Observable<Company[]> {
    return this.http.get(this.basePath + '?' + 'page=' + page + '&pageSize=' + pageSize + '&fields=' + fields + '&search=' + search).map(this.parseResponseArray);
  }

  get(id: string): Observable<Company> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  delete(id: string): Observable<Company> {
    return this.http.deleteCustom(this.basePath + '/' + id);
  }

  create(company: Company): Observable<Company> {
    return this.http.post(this.basePath, company).map(this.parseResponseObject);
  }

  createFast(company: any): Observable<Company> {
    return this.http.post(this.basePath, company).map(this.parseResponseObject);
  }

  update(company: Company): Observable<Company> {
    return this.http.put(this.basePath+ '/' + company.id, company).map(this.parseResponseObject);
  }

  parseResponseArray(response){
    response.data = CompanyFactory.createFromArray(response.data);
    return response;
  }

  parseResponseObject(response){
    return CompanyFactory.createFromObject(response);
  }

  // People request corresponding to a company

  getPeopleList(companyId: string): Observable<People[]> {
    return this.http.get(this.basePath+ '/' + companyId + '/contactList').map(this.parseResponsePeopleArray);
  }

  getPeople(companyId: string,id: string): Observable<People> {
    return this.http.get(this.basePath + '/' + companyId + '/contactList/' + id).map(this.parseResponsePeopleObject);
  }

  deletePeople(companyId: string,id: string): Observable<People> {
    return this.http.deleteCustom(this.basePath + '/' + companyId + '/contactList/' + id);
  }

  createPeople(companyId: string, people: People): Observable<People> {
    return this.http.post(this.basePath+ '/' + companyId + '/contactList', people).map(this.parseResponsePeopleObject);
  }

  setPeople(companyId: string, people: People): Observable<People> {
    return this.http.post(this.basePath+ '/' + companyId + '/contactList' + '/' + people.id, people).map(this.parseResponsePeopleObject);
  }

  updatePeople(companyId: string, people: People): Observable<People> {
    return this.http.put(this.basePath+ '/' + companyId + '/contactList/' + people.id, people).map(this.parseResponsePeopleObject);
  }

  // ContactList request corresponding to a company

  getContactListList(companyId: string): Observable<ContactList[]> {
    return this.http.get(this.basePath+ '/' + companyId + '/contact-list').map(this.parseResponsePeopleArray);
  }

  getContactList(companyId: string,id: string): Observable<ContactList> {
    return this.http.get(this.basePath + '/' + companyId + '/contact-list/' + id).map(this.parseResponsePeopleObject);
  }

  deleteContactList(companyId: string,id: string): Observable<ContactList> {
    return this.http.deleteCustom(this.basePath + '/' + companyId + '/contact-list/' + id);
  }

  createContactList(companyId: string, people: ContactList): Observable<ContactList> {
    return this.http.post(this.basePath+ '/' + companyId + '/contact-list', people).map(this.parseResponsePeopleObject);
  }

  setContactList(companyId: string, people: ContactList): Observable<ContactList> {
    return this.http.post(this.basePath+ '/' + companyId + '/contact-list' + '/' + people.id, people).map(this.parseResponsePeopleObject);
  }

  updateContactList(companyId: string, people: ContactList): Observable<ContactList> {
    return this.http.put(this.basePath+ '/' + companyId + '/contact-list/' + people.id, people).map(this.parseResponsePeopleObject);
  }


  parseResponsePeopleArray(response){
    return PeopleFactory.createFromArray(response.data);
  }

  parseResponsePeopleObject(response){
    return PeopleFactory.createFromObject(response);
  }
}
