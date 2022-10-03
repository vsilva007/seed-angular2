import {Employment} from "../models/employment.model";
export class EmploymentFactory {

  public static createFromArray(array: any[]): Employment[] {
    var objects: Employment[] = [];
    array.forEach(function(object){
      objects.push(EmploymentFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Employment {
    return new Employment(object.id, object.finalPosition, object.finalPositionNoah, object.functionalArea,
      object.seniority, object.founder, object.shareholder, object.company, object.contactList, object.current, object.boardRole,
      object.startDate, object.endDate);
  }
}
