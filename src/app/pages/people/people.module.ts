import {NgModule} from "@angular/core";
import {PeopleListComponent} from "./list/people-list.component";
import {PeopleCreateOrUpdateComponent} from "./create-or-update/create-update-people.component";
import {PeopleDetailComponent} from "./detail/people-detail.component";
import {SharedModule} from "../../shared/shared.module";
import {PeopleRoutingModule} from "./people.routing";
import {PeopleComponent} from "./people.component";
import {EmploymentModule} from "./employment/employment.module";
import {ConferenceModule} from "../conference/conference.module";

@NgModule({
  imports: [ SharedModule, PeopleRoutingModule, EmploymentModule, ConferenceModule ],
  declarations: [ PeopleComponent, PeopleListComponent, PeopleCreateOrUpdateComponent, PeopleDetailComponent ],
  exports: [PeopleListComponent]
})
export class PeopleModule { }
