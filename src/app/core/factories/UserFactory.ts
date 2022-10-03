import {User} from "../models/user.model";
export class UserFactory {

  public static createFromArray(array: any[]): User[] {
    var objects: User[] = [];
    array.forEach(function(object){
      objects.push(UserFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): User {
    return new User(object.id, object.name, object.surnames, object.email, object.password);
  }
}
