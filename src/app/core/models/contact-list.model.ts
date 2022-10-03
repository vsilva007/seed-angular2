import {Country} from "./country.model";
import {CountryFactory} from "../factories/CountryFactory";
export class ContactList {

  constructor(
    public id: string,
    public name: string,
    public surnames: string,
    public title: string
  ) {
  }
}
