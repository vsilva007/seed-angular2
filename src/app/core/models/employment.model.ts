import {SeniorityEnum} from "../enumerations/SeniorityEnum";
import {Company} from "./company.model";
import {People} from "./people.model";
import {CompanyFactory} from "../factories/CompanyFactory";
import {PeopleFactory} from "../factories/PeopleFactory";
export class Employment {

  public company: Company;
  public people: People;

  constructor(
    public id: string,
    public finalPosition: string,
    public finalPositionNoah: string,
    public functionalArea: string,
    public seniority: SeniorityEnum,
    public founder: boolean,
    public shareholder: boolean,
    company: Company,
    people: People,
    public current: boolean,
    public boardRole: boolean,
    public startDate?: string,
    public endDate?: string,
  ) {
    this.company = (company) ? CompanyFactory.createFromObject(company) : company;
    this.people = (people) ? PeopleFactory.createFromObject(people) : people;
  }
}
