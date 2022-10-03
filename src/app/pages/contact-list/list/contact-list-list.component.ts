import {Component, OnInit, ViewEncapsulation, Input, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ContactList} from "../../../core/models/contact-list.model";
import {ContactListService} from "../../../core/services/contact-list.service";
import {NotificationService} from "../../../core/services/notificationService";
import {CompanyService} from "../../../core/services/company.service";

@Component({
  selector: 'contact-list-list',
  templateUrl: './contact-list-list.component.html',
  styleUrls: ['./contact-list-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListListComponent implements OnInit {

  public errorMessage: any;
  public contactList: ContactList[] = null;
  public settings: any;
  @Input() public companyId: string = null;
  @Input() public hasTitle: boolean = true;
  @Input() inputEvents: EventEmitter<{ action: string }>;

  constructor(private route: ActivatedRoute, private router: Router, private service: ContactListService, private companyService: CompanyService, private notificationService: NotificationService) {
  }

  ngOnInit(){
    // this.route.params.subscribe(
    //   params => this.getListByCompany(params['id'])
    // );
    this.getList();

    if(this.inputEvents){
      this.inputEvents.subscribe((event: { action: string }) => {
        if (event.action === 'reload') {
          this.getList();
        }
      });
    }
  }

  private getList(){
    this.service.getList().subscribe(
      data => this.parse(data)
    );
  }

  private parse(contactList: ContactList[]){
    this.contactList = contactList;
  }

  public getContactList(){
    return this.contactList;
  }

  public deleteConfirmed(event: any){
    this.service.deleteContactList(event.id).subscribe(
      id => this.notificationService.successNotification("La lista de contactos se ha eliminado"),
      error => this.notificationService.errorNotification("No se ha podido eliminar la lista de contactos")
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
          property: 'name',
          title: 'Name'
        }
      ],
      header: 'Es la lista de contactos a la que podrás enviar comunicaciones de marketing',
      subHeader: 'weee',
      actions: {
        columnTitle: 'Actualizar',
        edit: {
          editRoute: '/contact-list/:id/edit',
        },
        delete: {
          description: 'name'
        }
      },
      entity: 'contactList'
    };
  }
}
