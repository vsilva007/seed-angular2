import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: 'people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PeopleDetailComponent{

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
