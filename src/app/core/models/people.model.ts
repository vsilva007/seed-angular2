import {Country} from "./country.model";
import {CountryFactory} from "../factories/CountryFactory";
export class People {

  public country: Country;

  constructor(
    public id: string,
    public name: string,
    public surnames: string,
    public title: string,
    public address: string,
    public city: string,
    country: Country,
    public linkedInLink: string,
    public facebookLink: string,
    public twitterLink: string,
  ) {
    this.country = (country) ? CountryFactory.createFromObject(country) : country;
  }
}
