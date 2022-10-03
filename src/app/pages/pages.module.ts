import { NgModule } from '@angular/core';
import {PagesRouting} from "./pages.routing";
import {AuthorizedComponent} from "./pages.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./login/login.component";
import {UserModule} from "./user/user.module";
import {EmailDesignerComponent} from "./email-designer/email-designer.component";
import {StatsComponent} from "./stats/stats.component";

@NgModule({
  imports: [ PagesRouting, SharedModule, UserModule ],
  declarations: [ AuthorizedComponent, ToolbarComponent, NavbarComponent, HomeComponent, LoginComponent, StatsComponent ],
  providers: [  ],
  bootstrap: [AuthorizedComponent]
})
export class PagesModule { }
