import {Lead} from "../models/lead.model";

export class LeadFactory {

  public static createFromArray(array: any[]): Lead[] {
    var objects: Lead[] = [];
    array.forEach(function(object){
      objects.push(LeadFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Lead {
    return new Lead(object.id, object.name, object.surnames, object.email,object.phoneNumber, object.date, object.active);
  }
}
