import {Country} from "../models/country.model";

export class CountryFactory {

  public static createFromArray(array: any[]): Country[] {
    var objects: Country[] = [];
    array.forEach(function(object){
      objects.push(CountryFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Country {
    return new Country(object.id, object.iso, object.code, object.name);
  }
}
