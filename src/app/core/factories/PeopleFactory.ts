import {People} from "../models/people.model";
export class PeopleFactory {

  public static createFromArray(array: any[]): People[] {
    var objects: People[] = [];
    array.forEach(function(object){
      objects.push(PeopleFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): People {
    return new People(object.id, object.name, object.surnames, object.title, object.address, object.city, object.country, object.linkedInLink, object.facebookLink, object.twitterLink);
  }
}
