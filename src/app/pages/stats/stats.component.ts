import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {

    console.log('Hello Home');
  }
}
