import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContactListComponent} from "./contact-list.component";
import {ContactListListComponent} from "./list/contact-list-list.component";
import {ContactListDetailComponent} from "./detail/contact-list-detail.component";
import {ContactListCreateOrUpdateComponent} from "./create-or-update/create-update-contact-list.component";
import {EmploymentCreateOrUpdateComponent} from "./employment/create-or-update/create-update-employment.component";


const routes: Routes = [
  { path: '',
    component: ContactListComponent,
    children: [
      { path: '',    component: ContactListListComponent },
      { path: 'new', component: ContactListCreateOrUpdateComponent },
      { path: ':id', redirectTo: ':id/edit' },
      { path: ':id/view', component: ContactListDetailComponent },
      { path: ':id/edit', component: ContactListCreateOrUpdateComponent },
      { path: ':id/contact/new', component: EmploymentCreateOrUpdateComponent},
      { path: ':id/contact/:contactId/edit', component: EmploymentCreateOrUpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactListRoutingModule {}
