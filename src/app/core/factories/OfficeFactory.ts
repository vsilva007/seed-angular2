import {Office} from "../models/office.model";
export class OfficeFactory {

  public static createFromArray(array: any[]): Office[] {
    var objects: Office[] = [];
    array.forEach(function(object){
      objects.push(OfficeFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Office {
    return new Office(object.id, object.addressLine1,object.addressLine2,object.number,object.postCode, object.city,
                      object.country, object.launchDate, object.geolocation,object.type);
  }
}
