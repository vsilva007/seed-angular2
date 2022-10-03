import {Component, OnInit, ViewEncapsulation, EventEmitter, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../../core/services/company.service";
import {NotificationService} from "../../../core/services/notificationService";
import {ContactList} from "../../../core/models/contact-list.model";
import {ContactListService} from "../../../core/services/contact-list.service";
import {Company} from "../../../core/models/company.model";

@Component({
  selector: 'campaing-create-target',
  templateUrl: './create-target.component.html',
  styleUrls: ['./create-target.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTargetComponent{

  public actionToPerform: string;
  public currentCampaingId: string;
  public contactList: ContactList[];
  private campaing: Company = null;
  @Input() public companyId: string = null;
  @Input() public hasTitle: boolean = true;
  @Input() inputEvents: EventEmitter<{ action: string }>;

  constructor(private route: ActivatedRoute, private router: Router, private companyService: CompanyService, private contactListService: ContactListService,  private notificationService: NotificationService,) {
  }

  ngOnInit(){

    this.route.params.subscribe(
      params => this.setActionToPerform(params)
    );

    if(this.inputEvents){
      this.inputEvents.subscribe((event: { action: string }) => {
        if (event.action === 'reload') {
          this.updateModels();
        }
      });
    }
  }

  private setActionToPerform(param: any) {
    this.currentCampaingId=param['id'];
    this.updateModels();
  }

  private updateModels(){
    this.contactListService.getList().subscribe(
      data => this.parse(data)
    );
    this.companyService.get(this.currentCampaingId).subscribe(
      data => this.parseCampaing(data)
    )
  }
  private parseCampaing(campaing: Company) {

    this.campaing = campaing;
  }
  private parse(contactList: ContactList[]){
    this.contactList = contactList;
  }

  public getContactList(){
    return this.contactList;
  }

  public getContactListByCampaing(){
    console.log(this.currentCampaingId);
    console.log(this.campaing);
    return (this.campaing) ? (this.campaing.contactLists || []) : [];
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
      header: 'Selecciona otra lista',
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
