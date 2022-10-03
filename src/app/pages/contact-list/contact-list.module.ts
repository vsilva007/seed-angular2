import {NgModule} from "@angular/core";
import {ContactListListComponent} from "./list/contact-list-list.component";
import {ContactListCreateOrUpdateComponent} from "./create-or-update/create-update-contact-list.component";
import {ContactListDetailComponent} from "./detail/contact-list-detail.component";
import {SharedModule} from "../../shared/shared.module";
import {ContactListRoutingModule} from "./contact-list.routing";
import {ContactListComponent} from "./contact-list.component";
import {EmploymentModule} from "./employment/employment.module";
import {ConferenceModule} from "../conference/conference.module";

@NgModule({
  imports: [ SharedModule, ContactListRoutingModule, EmploymentModule, ConferenceModule ],
  declarations: [ ContactListComponent, ContactListListComponent, ContactListCreateOrUpdateComponent, ContactListDetailComponent ],
  exports: [ContactListListComponent]
})
export class ContactListModule { }
