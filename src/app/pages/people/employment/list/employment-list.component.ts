import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../../core/services/notificationService";
import {Employment} from "../../../../core/models/employment.model";
import {PeopleService} from "../../../../core/services/people.service";

@Component({
  selector: 'employment-list',
  templateUrl: 'employment-list.component.html',
  styleUrls: ['employment-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmploymentListComponent implements OnInit {

  @Input() public peopleId: string = null;
  private employments: Employment[] = null;


  constructor(private service: PeopleService, private notificationService: NotificationService) {
  }


  ngOnInit(){
    // this.route.params.subscribe(
    //   params => this.getListByCompany(params['id'])
    // );
    if(this.peopleId){
      this.getList(this.peopleId)
    }
  }

  private getList(peopleId: string){
    this.service.getEmploymentList(peopleId).subscribe(
      data => this.parse(data)
    );
  }

  private parse(employments: Employment[]){
    this.employments = employments;
  }

  public getEmployments(){
    return this.employments;
  }

  public deleteConfirmed(event: any){
    this.service.deleteEmployment(this.peopleId, event.id).subscribe(
      id => this.notificationService.successNotification("The employment was successfully removed"),
      error => this.notificationService.errorNotification("The employment has not been successfully deleted")
    )
  }

  public getSettings(){
    return {
      search: false,
      pagination: false,
      ordering: false,
      info: false,
      flags: [
        {
          property: 'boardRole',
          title: 'Board Role'
        }
      ],
      columns: [
        {
          property: 'finalPositionNoah',
          title: 'Position Noah'
        },
        {
          property: 'company.abbreviationName',
          title: 'Company'
        },
      ],
      header: 'Lista de contactos',
      subHeader: '',
      actions: {
        columnTitle: 'Actions',
        edit: {
          editRoute: '/contactList/' + this.peopleId + '/employment/:id/edit',
        },
        delete: {
          description: 'finalPosition'
        }
      },
      entity: 'employment'
    };
  }
}
