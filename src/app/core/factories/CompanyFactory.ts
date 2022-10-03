import {Company} from "../models/company.model";
export class CompanyFactory {

  public static createFromArray(array: any[]): Company[] {
    var objects: Company[] = [];
    array.forEach(function(object){
      objects.push(CompanyFactory.createFromObject(object));
    });
    return objects;
  }

  public static createFromObject(object: any): Company {
    return new Company(object.id, object.abbreviationName, object.legalName, object.description, object.founded,
      object.website, object.linkedInLink, object.facebookLink, object.twitterLink,
      object.corporateEmailDomains, object.geographyOfOperations, object.strapline, object.activeMarkets,object.contactLists, object.industry, object.industryTags,
      object.currentEmployees, object.logo, object.serviceProvider);
  }
}
