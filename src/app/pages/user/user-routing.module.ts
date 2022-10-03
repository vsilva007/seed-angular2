import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {UserListComponent} from "./list/user-list.component";
import {UserDetailComponent} from "./detail/user-detail.component";
import {UserCreateOrUpdateComponent} from "./create-or-update/create-update-users.component";

const routes: Routes = [
  { path: '',
    component: UserComponent,
    children: [
      { path: '',    component: UserListComponent },
      { path: ':id/view', component: UserDetailComponent },
      { path: 'new', component: UserCreateOrUpdateComponent },
      { path: ':id/edit', component: UserCreateOrUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
