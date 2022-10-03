import {Component} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from "@angular/router";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  private sub: any;
  title: string;
  notificationOptions: any = {
    timeOut: 3000,
    lastOnBottom: false,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    position: ["top", "right"]
  };
  loadingBarOptions: any = {
    color: '#26B99A',
    height: '2px',
  };

  constructor(private slimLoader: SlimLoadingBarService, private router: Router) {


    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.slimLoader.start();
      } else if ( event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.slimLoader.complete();
      }
    }, (error: any) => {
      this.slimLoader.complete();
    });
  }


}
