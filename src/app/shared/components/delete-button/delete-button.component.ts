import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'delete-button',
  templateUrl: 'delete-button.component.html',
  styleUrls: ['delete-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DeleteButton implements OnInit {

  @Input() public description: string;
  @Input() public entity: string;
  @Input() id: string;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(){
  }

  public confirmDelete(): void{
    this.onConfirm.emit({id: this.id});
  }
}
