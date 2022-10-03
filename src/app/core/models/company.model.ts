import {Industry} from "./industry.model";
import {IndustryFactory} from "../factories/IndustryFactory";
import {CurrentEmployee} from "./currentEmployee.model";
import {CurrentEmployeeFactory} from "../factories/CurrentEmployeeFactory";
import {GeographyOfOperationsEnum} from "../enumerations/GeographyOfOperationsEnum";
import {IndustryTag} from "./industryTag.model";
import {IndustryTagFactory} from "../factories/IndustryTagFactory";
import {Country} from "./country.model";
import {CountryFactory} from "../factories/CountryFactory";
import {ContactList} from "./contact-list.model";
import {ContactListFactory} from "../factories/ContactListFactory";

export class Company {

  public industry: Industry;
  public currentEmployees: CurrentEmployee;
  public industryTags: IndustryTag[];
  public corporateEmailDomains: any;
  public activeMarkets: Country[];
  public contactLists: ContactList[];

  constructor(
    public id: string,
    public abbreviationName: string,
    public legalName: any,
    public description: string,
    public founded: number,
    public website: string,
    public linkedInLink: string,
    public facebookLink: string,
    public twitterLink: string,
    corporateEmailDomains: any,
    public geographyOfOperations: GeographyOfOperationsEnum,
    public strapline: string,
    activeMarkets: any,
    contactLists: any,
    industry?: any,
    industryTags?: any,
    currentEmployees?: any,
    public logo?: string,
    public serviceProvider?: boolean,
  ) {
    this.legalName = (typeof legalName === "string" || legalName === null ) ? legalName : legalName.join(';');
    this.industry = (industry) ? IndustryFactory.createFromObject(industry) : null;
    this.industryTags = (industryTags == null || industryTags === 'undefined' || industryTags === '') ? [] : IndustryTagFactory.createFromArray(industryTags) ;
    this.currentEmployees = (currentEmployees) ? CurrentEmployeeFactory.createFromObject(currentEmployees) : null;
    this.corporateEmailDomains = (typeof corporateEmailDomains === "string" || corporateEmailDomains === null ) ? corporateEmailDomains : corporateEmailDomains.join(';');
    this.activeMarkets = (activeMarkets) ? CountryFactory.createFromArray(activeMarkets) : [];
    this.contactLists = (contactLists) ? ContactListFactory.createFromArray(contactLists) : [];
  }
}

