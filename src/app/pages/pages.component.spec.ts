import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {ApiService} from "../core/services/api.service";
import {AuthorizedComponent} from "./pages.component";


describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthorizedComponent],
      providers: [ApiService, provideRoutes([])]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AuthorizedComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.url).toEqual('https://github.com/preboot/angular2-webpack');
  });

});
