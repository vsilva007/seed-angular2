import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {PeopleComponent} from "./people.component";
import {PeopleListComponent} from "./list/people-list.component";
import {PeopleDetailComponent} from "./detail/people-detail.component";
import {PeopleCreateOrUpdateComponent} from "./create-or-update/create-update-people.component";
import {EmploymentCreateOrUpdateComponent} from "./employment/create-or-update/create-update-employment.component";


const routes: Routes = [
  { path: '',
    component: PeopleComponent,
    children: [
      { path: '',    component: PeopleListComponent },
      { path: 'new', component: PeopleCreateOrUpdateComponent },
      { path: ':id', redirectTo: ':id/edit' },
      { path: ':id/view', component: PeopleDetailComponent },
      { path: ':id/edit', component: PeopleCreateOrUpdateComponent },
      { path: ':id/employment/new', component: EmploymentCreateOrUpdateComponent},
      { path: ':id/employment/:employmentId/edit', component: EmploymentCreateOrUpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
