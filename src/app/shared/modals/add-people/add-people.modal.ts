import {Component, OnInit, ViewEncapsulation, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {NotificationService} from "../../../core/services/notificationService";
import {Observable} from "rxjs";
import {SafeHtml, DomSanitizer} from "@angular/platform-browser";
import {PeopleService} from "../../../core/services/people.service";
import {People} from "../../../core/models/people.model";
import {CompanyService} from "../../../core/services/company.service";

@Component({
  selector: 'add-people-modal',
  templateUrl: 'add-people.modal.html',
  styleUrls: ['add-people.modal.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddPeopleModal implements OnInit {

  @Input() companyId: string;
  @ViewChild('addPeopleModal') addPeopleModal;
  @Output() outputEvent = new EventEmitter();

  public formGroup: FormGroup;
  public people: Array<any> = [];

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService, private notificationService: NotificationService, private _sanitizer: DomSanitizer,
  private companyService: CompanyService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      people: ['', [Validators.required, this.validateCompany]],
    });
    this.createPeopleSearch();
  }

  public submitFormGroup() {
    this.companyService.setPeople(this.companyId, this.formGroup.controls['people'].value).subscribe(
      people => this.correctPeople(people),
      error => this.notificationService.errorNotification(error)
    );
  }

  public correctPeople(people: any){
    this.outputEvent.emit({action: 'reload'});
    this.addPeopleModal.hide();
    this.notificationService.successNotification("People " + people.name  + " has successfuly been addded.");
  }

  private searchPeople(search: string){
    this.peopleService.getList("0", "10", "name,surnames", search).subscribe(
      people => this.setPeople(people)
    )
  }

  private createPeopleSearch() {
    this.people = [];
    this.formGroup.controls['people'].valueChanges.debounceTime(200).subscribe(search => {this.searchPeople(search)});
  }

  private setPeople(people: any[]) {
    let something: any = people;
    this.people = something;
  }

  observableSource(keyword: any) {
    return Observable.of(this.people);
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span style='cursor: default;'>${data.name} ${data.surnames}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  };

  validateCompany (c: FormControl) {
    if (c.value instanceof People) {
      return null;
    } else {
      return {
        validateCompany: {
          valid: false
        }
      }
    }
  }

  public showModal(){
    this.addPeopleModal.show();
  }
}
