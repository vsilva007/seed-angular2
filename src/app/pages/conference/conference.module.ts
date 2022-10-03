import {ConferenceListComponent} from "./list/conference-list.component";
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ConferenceRoutingModule} from "./conference.routing";
import {ConferenceComponent} from "./conference.component";

@NgModule({
  imports: [ SharedModule, ConferenceRoutingModule ],
  declarations: [ ConferenceComponent, ConferenceListComponent ],
  exports: [ConferenceListComponent]
})
export class ConferenceModule { }
