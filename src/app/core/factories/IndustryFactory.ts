
import {Industry} from "../models/industry.model";
export class IndustryFactory {

  public static createFromArray(array: any[]): Industry[] {
    var objects: Industry[] = [];
    array.forEach(function(object){
      objects.push(IndustryFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Industry {
    return new Industry(object.id, object.value, object.indexOrder);
  }
}
