import {Market} from "../models/market.model";

export class MarketFactory {

  public static createFromArray(array: any[]): Market[] {
    var objects: Market[] = [];
    array.forEach(function(object){
      objects.push(MarketFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Market {
    return new Market(object.id, object.value, object.indexOrder, object.countries);
  }
}
