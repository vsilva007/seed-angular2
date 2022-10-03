import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import {PagesModule} from "./pages/pages.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {PeopleModule} from './pages/people/people.module';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    CoreModule,
    PagesModule,
    PeopleModule,
    SharedModule,
  ],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
