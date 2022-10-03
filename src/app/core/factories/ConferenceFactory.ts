import {Conference} from "../models/conference.model";


export class ConferenceFactory {

  public static createFromArray(array: any[]): Conference[] {
    var objects: Conference[] = [];
    array.forEach(function(object){
      objects.push(ConferenceFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Conference {
    return new Conference(object.id, object.name, object.noahSourceId);
  }
}
