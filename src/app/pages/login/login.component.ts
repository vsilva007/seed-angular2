import {Component, OnInit, ViewEncapsulation, AfterViewChecked} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../../core/services/authentication.service";
import {AuthorizationService} from "../../core/services/authorization.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionFactory} from "../../core/factories/SessionFactory";
import {ThemePreloaderService} from "../../core/services/themePreloader.service";

@Component({
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit, AfterViewChecked{
  private authService: AuthenticationService;
  public authorizationService: AuthorizationService;
  public loginUser: FormGroup;
  public errors: any = {username: {error: false}, password: {error: false}};
  public something: any;
  public serverError: any;

  constructor(private router: Router, authService: AuthenticationService, authorization: AuthorizationService, private formBuilder: FormBuilder,
  private preloaderService: ThemePreloaderService) {
    this.authService = authService;
    this.authorizationService = authorization;
  }

  ngOnInit() {
    this.loginUser = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngAfterViewChecked(): void {
    // hide spinner once all loaders are completed
    if(this.preloaderService.displayed()){
      this.preloaderService.hide();
    }
  }

  public submitLogin(): void {
    this.errors = {username: {error: false}, password: {error: false}};
    if (this.loginUser.valid) {
      var loginObject = {
        email: this.loginUser.controls["username"].value,
        password: this.loginUser.controls["password"].value
      };
      this.authService.login(loginObject).subscribe(
        session => this.loginCorrect(session),
        error => this.loginError(<any>error)
      );
    } else {
      if (!this.loginUser.controls["username"].valid) {
        this.errors.username = {error: true, errorTag: "Field is mandatory"}
      }
      if (!this.loginUser.controls["password"].valid) {
        this.errors.password = {error: true, errorTag: "Field is mandatory"}
      }
    }
  }

  public loginCorrect(session: any): void {
    this.authorizationService.setCurrentSession(SessionFactory.createFromObject(session));
    this.router.navigate(['/home']);
  }

  loginError(error): void {
    this.serverError = error;
    console.error("Error logging in", error);
  }
}
