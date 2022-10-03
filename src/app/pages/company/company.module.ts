import {CompanyComponent} from "./company.component";
import {CompanyDetailComponent} from "./detail/copany-detail.component";
import {CompanyListComponent} from "./list/company-list.component";
import {CompanyRoutingModule} from "./company.routing";
import {NgModule} from "@angular/core";
import {CompanyCreateOrUpdateComponent} from "./create-or-update/create-update-company.component";
import {SharedModule} from "../../shared/shared.module";
// import {CompanyOfficeComponent} from "./office/create-or-update/company-office-detail.component";
import {OfficeModule} from "./office/office.module";
import {CreateTargetComponent} from "./create-target/create-target.component";

@NgModule({
  imports: [ CompanyRoutingModule, SharedModule, OfficeModule ],
  declarations: [CompanyComponent, CompanyDetailComponent, CompanyListComponent, CompanyCreateOrUpdateComponent, CreateTargetComponent],
})
export class CompanyModule { }
