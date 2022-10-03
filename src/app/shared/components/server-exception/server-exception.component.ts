import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';

@Component({
  selector: 'server-exception',
  templateUrl: 'server-exception.component.html',
  styleUrls: ['server-exception.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ServerException implements OnInit {

  @Input() public error: any;

  constructor() {
  }

  ngOnInit(){
  }
}
