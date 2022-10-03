import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {OfficeService} from "../../../../core/services/office.service";
import {Office} from "../../../../core/models/office.model";
import {NotificationService} from "../../../../core/services/notificationService";

@Component({
  selector: 'office-list',
  templateUrl: 'office-list.component.html',
  styleUrls: ['office-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfficeListComponent implements OnInit {

  @Input() public companyId: string = null;
  public errorMessage: any;
  private offices: Office[] = null;


  constructor(private service: OfficeService, private notificationService: NotificationService) {
  }


  ngOnInit(){
    // this.route.params.subscribe(
    //   params => this.getListByCompany(params['id'])
    // );
    if(this.companyId){
      this.getList(this.companyId)
    }
  }

  private getList(companyId: string){
    this.service.getList(companyId).subscribe(
      data => this.parse(data)
    );
  }

  private parse(offices: Office[]){
    this.offices = offices;
  }

  public getOffices(){
    return this.offices;
  }

  public deleteConfirmed(event: any){
    this.service.deleteObject(this.companyId, event.id).subscribe(
      id => this.notificationService.successNotification("The office was successfully removed"),
      error => this.notificationService.errorNotification("The office has not been successfully deleted")
    )
  }

  public getSettings(){
    return {
      search: false,
      pagination: false,
      ordering: false,
      info: false,
      columns: [
        {
          property: 'addressLine1',
          title: 'Location'
        },
        {
          property: 'type',
          title: 'Type'
        },
        {
          property: 'country.name',
          title: 'Country'
        },
      ],
      header: 'Office List',
      subHeader: '',
      actions: {
        columnTitle: 'Actions',
        edit: {
          editRoute: '/companies/' + this.companyId + '/office/:id/edit',
        },
        delete: {
          description: 'type'
        }
      },
      entity: 'office'
    };
  }
}
