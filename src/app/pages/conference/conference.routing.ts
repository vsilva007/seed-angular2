import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ConferenceListComponent} from "./list/conference-list.component";
import {ConferenceComponent} from "./conference.component";

const routes: Routes = [
  { path: '',
    component: ConferenceComponent,
    children: [
      { path: '',    component: ConferenceListComponent },
      // { path: ':id/view', component: PeopleDetailComponent },
      // { path: 'new', component: ConferenceCreateOrUpdateComponent },
      // { path: ':id/edit', component: ConferenceCreateOrUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule {}
