
import {CurrentEmployee} from "../models/currentEmployee.model";
export class CurrentEmployeeFactory {

  public static createFromArray(array: any[]): CurrentEmployee[] {
    var objects: CurrentEmployee[] = [];
    array.forEach(function(object){
      objects.push(CurrentEmployeeFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): CurrentEmployee {
    return new CurrentEmployee(object.id, object.value, object.indexOrder);
  }
}
