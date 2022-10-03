import {Session} from "../models/session.model";
export class SessionFactory {

  public static createFromArray(array: any[]): Session[] {
    var objects: Session[] = [];
    array.forEach(function(object){
      objects.push(SessionFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Session {
    return new Session(object.token, object.userAccount);
  }
}
