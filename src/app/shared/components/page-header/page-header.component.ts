import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'page-header',
  templateUrl: 'page-header.component.html',
  styleUrls: ['page-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PageHeader implements OnInit {

  @Input() public actionButton: any = null;
  @Input() public title: string;
  @Output() onAction: EventEmitter<any> = new EventEmitter();

  constructor(private location: Location) {
  }

  ngOnInit(){
  }

  sendAction(){
    this.onAction.emit({value: 'pressed'});
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
