import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: 'contact-list-detail',
  templateUrl: './contact-list-detail.component.html',
  styleUrls: ['./contact-list-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListDetailComponent{

  // public entity: People = new People(null, null, null, null, null);
  // public errorMessage: any;
  //
  constructor() {
  }
  //
  // ngOnInit(){
  //   this.route.params.subscribe(
  //     params => this.setPeople(params['id'])
  //   )
  // }
  //
  // private setPeople(id: string) {
  //   this.peopleService.get(id).subscribe(
  //     user => this.entity = user
  //   )
  // }
  //
  // public deletePeople(event: any){
  //   this.peopleService.delete(event.id).subscribe(
  //     id => this.notificationService.successNotification("The user was successfully removed"),
  //     error => this.notificationService.errorNotification("The user has not been successfully deleted")
  //   )
  // }
}
