import {Component, OnInit, ViewEncapsulation, Input, EventEmitter} from '@angular/core';
import {Conference} from "../../../core/models/conference.model";
import {PeopleService} from "../../../core/services/people.service";
import {NotificationService} from "../../../core/services/notificationService";

@Component({
  selector: 'conference-list',
  templateUrl: 'conference-list.component.html',
  styleUrls: ['conference-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConferenceListComponent implements OnInit {

  @Input() public peopleId: string = null;
  private conferences: Conference[] = null;
  @Input() inputEvents: EventEmitter<{ action: string }>;


  constructor(private service: PeopleService, private notificationService: NotificationService) {
  }


  ngOnInit(){
    if(this.peopleId){
      this.getList(this.peopleId)
    }
    if(this.inputEvents){
      this.inputEvents.subscribe((event: { action: string }) => {
        if (event.action === 'reload') {
          this.getList(this.peopleId);
        }
      });
    }
  }

  private getList(peopleId: string){
    this.service.getConferenceList(peopleId).subscribe(
      data => this.parse(data)
    );
  }

  private parse(conferences: Conference[]){
    this.conferences = conferences;
  }

  public getConferences(){
    return this.conferences;
  }

  public deleteConfirmed(event: any){
    this.service.deleteConference(this.peopleId, event.id).subscribe(
      id => this.notificationService.successNotification("The conference was successfully removed"),
      error => this.notificationService.errorNotification("The conference has not been successfully deleted")
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
        },
        {
          property: 'noahSourceId',
          title: 'Noah Conference Id'
        },
      ],
      header: 'Conferences List',
      subHeader: '',
      actions: {
        columnTitle: 'Actions',
        delete: {
          description: 'name'
        }
      },
      entity: 'conference'
    };
  }
}
