import {OfficeTypeEnum} from "../enumerations/OfficeTypeEnum";
import {Country} from "./country.model";
import {CountryFactory} from "../factories/CountryFactory";
export class Office {

  public country: Country;

  constructor(
    public id: string,
    public addressLine1: string,
    public addressLine2: string,
    public number: string,
    public postCode: string,
    public city: string,
    country: Country,
    public launchDate: string,
    public geolocation: string,
    public type: OfficeTypeEnum,
  ) {
    this.country = (country) ? CountryFactory.createFromObject(country) : country;
  }
}
