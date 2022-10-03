import {CountryFactory} from "../factories/CountryFactory";
import {Country} from "./country.model";

export class Market {
  public countries: Country[];

  constructor(
    public id: string,
    public value: string,
    public indexOrder: number,
    countries: any
  ) {
    this.countries = (countries) ? CountryFactory.createFromArray(countries) : [];
  }
}

