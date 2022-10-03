import {Component, OnInit, ViewEncapsulation, Input, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {People} from "../../../core/models/people.model";
import {PeopleService} from "../../../core/services/people.service";
import {NotificationService} from "../../../core/services/notificationService";
import {CompanyService} from "../../../core/services/company.service";

@Component({
  selector: 'people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PeopleListComponent implements OnInit {

  public errorMessage: any;
  public people: People[] = null;
  public settings: any;
  @Input() public companyId: string = null;
  @Input() public hasTitle: boolean = true;
  @Input() inputEvents: EventEmitter<{ action: string }>;

  constructor(private route: ActivatedRoute, private router: Router, private service: PeopleService, private companyService: CompanyService, private notificationService: NotificationService) {
  }

  ngOnInit(){
    // this.route.params.subscribe(
    //   params => this.getListByCompany(params['id'])
    // );
    if(this.companyId) {
      this.getList(this.companyId)
    }
    if(this.inputEvents){
      this.inputEvents.subscribe((event: { action: string }) => {
        if (event.action === 'reload') {
          this.getList(this.companyId);
        }
      });
    }
  }

  private getList(companyId: string){
    this.companyService.getPeopleList(companyId).subscribe(
      data => this.parse(data)
    );
  }

  private parse(people: People[]){
    this.people = people;
  }

  public getPeople(){
    return this.people;
  }

  public deleteConfirmed(event: any){
    this.companyService.deletePeople(this.companyId, event.id).subscribe(
      id => this.notificationService.successNotification("The contactList was successfully removed"),
      error => this.notificationService.errorNotification("The contactList has not been successfully deleted")
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
          property: 'title',
          title: 'Title'
        },
        {
          property: 'name',
          title: 'Name'
        },
        {
          property: 'surnames',
          title: 'Last Name'
        },
      ],
      header: 'People List',
      subHeader: '',
      actions: {
        columnTitle: 'Actions',
        edit: {
          editRoute: '/companies/' + this.companyId + '/contactList/:id/edit',
        },
        delete: {
          description: 'name'
        }
      },
      entity: 'people'
    };
  }
}
