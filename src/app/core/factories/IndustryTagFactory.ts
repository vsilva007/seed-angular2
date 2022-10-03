import {IndustryTag} from "../models/industryTag.model";

export class IndustryTagFactory {

  public static createFromArray(array: any[]): IndustryTag[] {
    var objects: IndustryTag[] = [];
    array.forEach(function(object){
      objects.push(IndustryTagFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): IndustryTag {
    return new IndustryTag(object.id, object.value, object.indexOrder);
  }
}
