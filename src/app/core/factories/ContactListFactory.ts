import {ContactList} from "../models/contact-list.model";
export class ContactListFactory {

  public static createFromArray(array: any[]): ContactList[] {
    var objects: ContactList[] = [];
    array.forEach(function(object){
      objects.push(ContactListFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): ContactList {
    return new ContactList(object.id, object.name, object.surnames, object.title);
  }
}
