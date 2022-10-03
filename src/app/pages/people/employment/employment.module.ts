import {SharedModule} from "../../../shared/shared.module";
import {EmploymentListComponent} from "./list/employment-list.component";
import {NgModule} from "@angular/core";
import {EmploymentCreateOrUpdateComponent} from "./create-or-update/create-update-employment.component";

@NgModule({
  imports: [ SharedModule ],
  declarations: [ EmploymentListComponent, EmploymentCreateOrUpdateComponent ],
  exports: [EmploymentListComponent]
})
export class EmploymentModule { }
