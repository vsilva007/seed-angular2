import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompanyComponent} from "./company.component";
import {CompanyListComponent} from "./list/company-list.component";
import {CompanyDetailComponent} from "./detail/copany-detail.component";
import {CompanyCreateOrUpdateComponent} from "./create-or-update/create-update-company.component";
import {OfficeCreateOrUpdateComponent} from "./office/create-or-update/create-update-office.component";
import {PeopleCreateOrUpdateComponent} from "../people/create-or-update/create-update-people.component";
import {PeopleComponent} from "../people/people.component";
import {CreateTargetComponent} from "./create-target/create-target.component";

const routes: Routes = [
  { path: '',
    component: CompanyComponent,
    children: [
      { path: '',    component: CompanyListComponent },
      { path: 'new', component: CompanyCreateOrUpdateComponent },
      { path: ':id', component: CompanyDetailComponent, redirectTo: ':id/edit'},
      { path: ':id/edit', component: CompanyCreateOrUpdateComponent },
      { path: ':id/office/new', component: OfficeCreateOrUpdateComponent },
      { path: ':id/office/:officeId/edit', component: OfficeCreateOrUpdateComponent },
      { path: ':id/contactList', loadChildren: '../contact-list/contact-list.module#PeopleModule' },
      { path: ':id/create-target', component: CreateTargetComponent },
      // { path: ':id/contactList/new', component: PeopleCreateOrUpdateComponent },
      // { path: ':id/contactList/:peopleId/edit', component: PeopleCreateOrUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
