import {CommonModule} from "@angular/common";
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {UserService} from "./services/user.service";
import {ApiService} from "./services/api.service";
import {AuthGuard} from "./guards/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {AuthorizationService} from "./services/authorization.service";
import {ExceptionService} from "./services/exception.service";
import {HttpClient} from "./services/httpclient.service";
import {CompanyService} from "./services/company.service";
import {IndustryService} from "./services/industry.service";
import {OfficeService} from "./services/office.service";
import {CurrentEmployeeService} from "./services/currentEmployee.service";
import {PeopleService} from "./services/people.service";
import {CountryService} from "./services/country.service";
import {ThemePreloaderService} from "./services/themePreloader.service";
import {NotificationsService} from "angular2-notifications";
import {NotificationService} from "./services/notificationService";
import {IndustryTagService} from "./services/industryTag.service";
import {MarketService} from "./services/market.service";
import {LoginGuard} from "./guards/login.guard";
import {ConferenceService} from "./services/conference.service";
import {ContactListService} from "./services/contact-list.service";

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ApiService,
    AuthGuard,
    AuthenticationService,
    UserService,
    CompanyService,
    IndustryService,
    OfficeService,
    AuthorizationService,
    ExceptionService,
    HttpClient,
    NotificationService,
    CurrentEmployeeService,
    PeopleService,
    CountryService,
    ThemePreloaderService,
    NotificationsService,
    IndustryTagService,
    MarketService,
    LoginGuard,
    ConferenceService,
    ContactListService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
