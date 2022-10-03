import {SharedModule} from "../../../shared/shared.module";
import {OfficeListComponent} from "./list/office-list.component";
import {NgModule} from "@angular/core";
import {OfficeCreateOrUpdateComponent} from "./create-or-update/create-update-office.component";

@NgModule({
  imports: [ SharedModule ],
  declarations: [ OfficeListComponent, OfficeCreateOrUpdateComponent ],
  exports: [OfficeListComponent]
})
export class OfficeModule { }
