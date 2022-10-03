import { Component } from '@angular/core';
import {User} from "../../core/models/user.model";
import {AuthorizationService} from "../../core/services/authorization.service";
import {AuthenticationService} from "../../core/services/authentication.service";

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {
  // TypeScript public modifier
  public user: User;
  private authService: AuthenticationService;

  constructor(private authorizationService: AuthorizationService, authService: AuthenticationService) {
    this.authService = authService;
  }

  toggleClicked(event: MouseEvent)
  {
    var target = event.srcElement.id;
    var body = $('body');
    var menu = $('#sidebar-menu');

    // toggle small or large menu
    if (body.hasClass('nav-md')) {
      menu.find('li.active ul').hide();
      menu.find('li.active').addClass('active-sm').removeClass('active');
    } else {
      menu.find('li.active-sm ul').show();
      menu.find('li.active-sm').addClass('active').removeClass('active-sm');
    }
    body.toggleClass('nav-md nav-sm');

  }
  ngOnInit(){;
    this.user = this.authorizationService.getCurrentUser();
  }

  onClickLogOut(){
    this.authService.logOut().subscribe(
      session => this.loginCorrect(session),
      error => this.loginError(<any>error)
    );
  }
  public loginCorrect(session: any):void{
    this.authorizationService.logout();
  }

  loginError(error):void{
    this.authorizationService.logout();
  }

  ngAfterViewInit(){

  }

}
