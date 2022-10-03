import {Component, OnInit, ViewEncapsulation, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {NotificationService} from "../../../core/services/notificationService";
import {Observable} from "rxjs";
import {SafeHtml, DomSanitizer} from "@angular/platform-browser";
import {PeopleService} from "../../../core/services/people.service";
import {Conference} from "../../../core/models/conference.model";
import {ConferenceService} from "../../../core/services/conference.service";

@Component({
  selector: 'add-attended-conference-modal',
  templateUrl: 'add-attended-conference.modal.html',
  styleUrls: ['add-attended-conference.modal.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddAttendedConferenceModal implements OnInit {

  @Input() peopleId: string;
  @ViewChild('addAttendedConferenceModal') addAttendedConferenceModal;
  @Output() outputEvent = new EventEmitter();

  public formGroup: FormGroup;
  public conferences: Array<any> = [];

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService, private notificationService: NotificationService, private _sanitizer: DomSanitizer,
  private conferenceService: ConferenceService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      conference: ['', [Validators.required, this.validateConference]],
    });
    this.createSearch();
  }

  public submitFormGroup() {
    this.peopleService.setConference(this.peopleId, this.formGroup.controls['conference'].value).subscribe(
      people => this.correctPeople(people),
      error => this.notificationService.errorNotification(error)
    );
  }

  public correctPeople(conference: any){
    this.outputEvent.emit({action: 'reload'});
    this.addAttendedConferenceModal.hide();
    this.notificationService.successNotification("Conference " + conference.name  + " has successfuly been addded.");
  }

  private searchConference(search: string){
    this.conferenceService.getList("0", "10", "name,noahSourceId", search).subscribe(
      conferences => this.setConferences(conferences)
    )
  }

  private createSearch() {
    this.conferences = [];
    this.formGroup.controls['conference'].valueChanges.debounceTime(200).subscribe(search => {this.searchConference(search)});
  }

  private setConferences(people: any[]) {
    let something: any = people;
    this.conferences = something;
  }

  observableSource(keyword: any) {
    return Observable.of(this.conferences);
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span style='cursor: default;'>${data.name} (${data.noahSourceId})</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  };

  validateConference (c: FormControl) {
    if (c.value instanceof Conference) {
      return null;
    } else {
      return {
        validateConference: {
          valid: false
        }
      }
    }
  }

  public showModal(){
    this.addAttendedConferenceModal.show();
  }
}
