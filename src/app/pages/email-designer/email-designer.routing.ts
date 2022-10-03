import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {EmailDesignerListComponent} from "./list/email-designer-list.component";
import {EmailDesignerComponent} from "./email-designer.component";


const routes: Routes = [
  { path: '',
    component: EmailDesignerComponent,
    children: [
      { path: '',    component: EmailDesignerListComponent },
      // { path: ':id/view', component: PeopleDetailComponent },
      // { path: 'new', component: EmailDesignerCreateOrUpdateComponent },
      // { path: ':id/edit', component: EmailDesignerCreateOrUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailDesignerRoutingModule {}
