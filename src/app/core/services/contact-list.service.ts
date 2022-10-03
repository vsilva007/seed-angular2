

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "./httpclient.service";
import {ContactListFactory} from "../factories/ContactListFactory";
import {ContactList} from "../models/contact-list.model";
import {EmploymentFactory} from "../factories/EmploymentFactory";
import {Employment} from "../models/employment.model";
import {ConferenceFactory} from "../factories/ConferenceFactory";
import {Lead} from "../models/lead.model";
import {LeadFactory} from "../factories/LeadFactory";


@Injectable()
export class ContactListService {
  constructor(private http: HttpClient) {

  }
  private basePath = 'contact-list';

  getList(page: string = "0", pageSize: string = "10", fields: string = "", search: string = ""): Observable<ContactList[]> {
    return this.http.get(this.basePath + '?' + 'page=' + page + '&pageSize=' + pageSize + '&fields=' + fields + '&search=' + search).map(this.parseResponseArray);
  }

  getContactList(id: string): Observable<ContactList> {
    return this.http.get(this.basePath + '/' + id).map(this.parseResponseObject);
  }

  deleteContactList(id: string): Observable<ContactList> {
    return this.http.deleteCustom(this.basePath + '/' + id);
  }


  createContactList(contactList: ContactList): Observable<ContactList> {
    return this.http.post(this.basePath, contactList).map(this.parseResponseObject);
  }

  updateContactList(contactList: ContactList): Observable<ContactList> {
    return this.http.put(this.basePath, contactList).map(this.parseResponseObject);
  }

  // contacts on the contactList
  getContactsFromContactList(contactListId: string): Observable<Lead[]> {
    return this.http.get(this.basePath+ '/' + contactListId + '/contact').map(this.parseResponseContactArray);
  }

  deleteContactFromContactList(contactListId: string,id: string): Observable<Lead> {
    return this.http.deleteCustom(this.basePath + '/' + contactListId + '/contact/' + id);
  }

  createContact(peopleId: string, lead: Lead): Observable<Lead> {
    return this.http.post(this.basePath+ '/' + peopleId + '/contact', lead).map(this.parseResponseContactObject);
  }

  updateContact(contactId: string, lead: Lead): Observable<Lead> {
    return this.http.put(this.basePath+ '/' + contactId + '/contact/' + lead.id, lead).map(this.parseResponseContactObject);
  }

  getContact(contactListId: string,id: string): Observable<Lead> {
    return this.http.get(this.basePath + '/' + contactListId + '/contact/' + id).map(this.parseResponseContactObject);
  }






  parseResponseObject(response){
    return ContactListFactory.createFromObject(response);
  }
  parseResponseArray(response){
    return ContactListFactory.createFromArray(response.data);
  }
  parseResponseContactArray(response){
    return LeadFactory.createFromArray(response.data);
  }

  parseResponseContactObject(response){
    return LeadFactory.createFromObject(response);
  }
}
