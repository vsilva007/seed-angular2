import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../../core/services/notificationService";
import {Employment} from "../../../../core/models/employment.model";
import {ContactListService} from "../../../../core/services/contact-list.service";
import {Lead} from "../../../../core/models/lead.model";

@Component({
  selector: 'people-contact-list',
  templateUrl: 'employment-list.component.html',
  styleUrls: ['employment-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmploymentListComponent implements OnInit {

  @Input() public contactListId: string = null;
  private lead: Lead[] = null;


  constructor(private service: ContactListService, private notificationService: NotificationService) {
  }


  ngOnInit(){
    // this.route.params.subscribe(
    //   params => this.getListByCompany(params['id'])
    // );
    if(this.contactListId){
      this.getList(this.contactListId)
    }
  }

  private getList(contactListId: string){
    this.service.getContactsFromContactList(contactListId).subscribe(
      data => this.parse(data)
    );
  }

  private parse(lead: Lead[]){
    this.lead = lead;
  }

  public getEmployments(){
    return this.lead;
  }

  public deleteConfirmed(event: any){
    this.service.deleteContactFromContactList(this.contactListId, event.id).subscribe(
      id => this.notificationService.successNotification("The employment was successfully removed"),
      error => this.notificationService.errorNotification("The employment has not been successfully deleted")
    )
  }

  public getSettings(){
    return {
      search: true,
      pagination: true,
      ordering: false,
      info: false,
      columns: [
        {
          property: 'starts',
          title: 'Estrellas'
        },{
          property: 'name',
          title: 'Nombre'
        },{
          property: 'email',
          title: 'Email'
        },{
          property: 'phoneNumber',
          title: 'Teléfono'
        },{
          property: 'channels',
          title: 'Canales'
        },
      ],
      header: 'Lista de contactos',
      subHeader: '',
      actions: {
        columnTitle: 'Actualizar',
        edit: {
          editRoute: '/contact-list/' + this.contactListId + '/contact/:id/edit',
        },
        delete: {
          description: 'finalPosition'
        }
      },
      entity: 'employment'
    };
  }
}
