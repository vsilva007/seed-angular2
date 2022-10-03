import {UserComponent} from "./user.component";
import {UserDetailComponent} from "./detail/user-detail.component";
import {UserListComponent} from "./list/user-list.component";
import {UserRoutingModule} from "./user-routing.module";
import {NgModule} from "@angular/core";
import {UserCreateOrUpdateComponent} from "./create-or-update/create-update-users.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [ UserRoutingModule, SharedModule ],
  declarations: [
    UserComponent, UserDetailComponent, UserListComponent, UserCreateOrUpdateComponent ],
})
export class UserModule { }
