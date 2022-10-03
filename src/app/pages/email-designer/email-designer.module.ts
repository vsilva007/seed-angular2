import {EmailDesignerListComponent} from "./list/email-designer-list.component";
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {EmailDesignerRoutingModule} from "./email-designer.routing";
import {EmailDesignerComponent} from "./email-designer.component";

@NgModule({
  imports: [ SharedModule, EmailDesignerRoutingModule ],
  declarations: [ EmailDesignerComponent, EmailDesignerListComponent ],
  exports: [EmailDesignerListComponent]
})
export class EmailDesignerModule { }
