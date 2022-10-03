import {Component, ViewEncapsulation, AfterViewChecked} from '@angular/core';
import {Router} from "@angular/router";
import {ThemePreloaderService} from "../core/services/themePreloader.service";

@Component({
  selector: 'authorized',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorizedComponent implements AfterViewChecked {

  constructor(private router: Router, private preloaderService: ThemePreloaderService) {
  }

  ngAfterViewChecked(): void {
    // hide spinner once all loaders are completed
    if(this.preloaderService.displayed()){
      this.preloaderService.hide();
    }
  }
}
