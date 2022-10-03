import { RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";
import {AuthorizedComponent} from "./pages.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {LoginGuard} from "../core/guards/login.guard";
import {StatsComponent} from "./stats/stats.component";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [ LoginGuard ]
      },
      {
        path: '',
        component: AuthorizedComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'users', loadChildren: './user/user.module#UserModule', },
          { path: 'stats', component: StatsComponent, },
          { path: 'campaings', loadChildren: './company/company.module#CompanyModule' },
          { path: 'contact-list', loadChildren: './contact-list/contact-list.module#ContactListModule' },
          { path: 'designer', loadChildren: './email-designer/email-designer.module#EmailDesignerModule' }
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class PagesRouting { }
