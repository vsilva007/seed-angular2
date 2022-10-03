import {Component, OnInit, ViewEncapsulation, Input, EventEmitter, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {People} from "../../../core/models/people.model";
import {PeopleService} from "../../../core/services/people.service";
import {NotificationService} from "../../../core/services/notificationService";
import {PeopleFactory} from "../../../core/factories/PeopleFactory";
import {Country} from "../../../core/models/country.model";
import {CountryService} from "../../../core/services/country.service";
import {CompanyService} from "../../../core/services/company.service";
import { CustomValidators } from 'ng2-validation';
import {peopleTitles} from "../../../core/enumerations/peopleTitles";
import {AddAttendedConferenceModal} from "../../../shared/modals/add-attended-conference/add-attended-conference.modal";


@Component({
  selector: 'create-update-people',
  templateUrl: './create-update-people.component.html',
  styleUrls: ['./create-update-people.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PeopleCreateOrUpdateComponent implements OnInit {

  public formGroup: FormGroup;
  public actionToPerform: string;
  public errors = this.initErrors();
  public updateBackup: People;
  // Value if we want to separate module contactList of company
  // @Input() public companyId: string = null;
  public companyId: string = null;
  public peopleId: string = null;
  public countries: Country[] = [];
  @ViewChild('addAttendedConferenceModal') public addAttendedConferenceModal: AddAttendedConferenceModal;
  public conferenceListEvent: EventEmitter<any> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private peopleService: PeopleService, private notificationService: NotificationService,
              private countryService: CountryService, private companyService: CompanyService) {
  }

  ngOnInit(){
    this.activatedRoute.parent.params.subscribe(
      params => this.setParentId(params)
    );
    this.getCountries();
  }


  private setParentId(params: any) {
    this.companyId=params['id'];
    this.activatedRoute.params.subscribe(
      params => this.setActionToPerform(params)
    );
  }

  private setActionToPerform(params: any) {
    if(!params['id']){
      this.actionToPerform = 'create';
      this.createForm();
    }else{
      this.actionToPerform = 'update';
      this.peopleId = params['id'];
      this.createForm();
      this.companyService.getPeople(this.companyId, this.peopleId).subscribe(
        company => this.setUpdateForm(company)
      );
    }
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      title: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: [, Validators.required],
      linkedInLink: ['', CustomValidators.url],
      facebookLink: ['', CustomValidators.url],
      twitterLink: ['', CustomValidators.url]
    });
  }

  private setUpdateForm(people: People) {
    this.updateBackup = people;
    this.resetUpdateForm();
  }

  private resetUpdateForm(){
    this.formGroup.controls['name'].setValue(this.updateBackup.name);
    this.formGroup.controls['surnames'].setValue(this.updateBackup.surnames);
    this.formGroup.controls['title'].setValue(this.updateBackup.title);
    this.formGroup.controls['address'].setValue(this.updateBackup.address);
    this.formGroup.controls['city'].setValue(this.updateBackup.city);
    this.formGroup.controls['linkedInLink'].setValue(this.updateBackup.linkedInLink);
    this.formGroup.controls['facebookLink'].setValue(this.updateBackup.facebookLink);
    this.formGroup.controls['twitterLink'].setValue(this.updateBackup.twitterLink);
    this.formGroup.controls['country'].setValue((this.updateBackup.country) ? this.countries.filter(item => item.id === this.updateBackup.country.id)[0] : '');
  }

  public submitForm(){
    (this.actionToPerform == 'create') ? this.submitCreateForm() : this.submitUpdateForm();
  }

  public submitCreateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      this.companyService.createPeople(this.companyId, PeopleFactory.createFromObject(this.formGroup.value)).subscribe(
          user => this.returnToUsers(user),
          error => this.notificationService.errorNotification("People has not been created")
        );
    }else{
      this.validateForm();
    }
  }

  public submitUpdateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      let people = PeopleFactory.createFromObject(this.formGroup.value);
      people.id = this.peopleId;
      this.companyService.updatePeople(this.companyId, people).subscribe(
        user => this.returnToUsersUpdate(user),
        error => this.notificationService.errorNotification("People has not been updated")
      );
    }else{
      this.validateForm();
    }
  }

  private returnToUsers(people: People) {
    this.notificationService.successNotification("People " + people.title + people.name + people.surnames + "has successfuly been created.");
    this.router.navigate(['/companies/' + this.companyId + '/edit'])
  }

  private returnToUsersUpdate(people: People) {
    this.notificationService.successNotification("People " + people.title + people.name + people.surnames + "has successfuly been updated.");
    this.router.navigate(['/companies/' + this.companyId + '/edit'])
  }

  private validateForm(){
    for(let key in this.errors){
      if(!this.formGroup.controls[key].valid){
        this.errors[key].error = true;
        this.errors[key].errorTag = this.errors[key].label + " is mandatory";
      }
    }
  }

  private initErrors(){
    return {
      name: {label: 'First Name', error: false, errorTag: ""},
      surnames: {label: 'Last name', error: false, errorTag: ""},
      title: {label: 'Title', error: false, errorTag: ""},
      address: {label: 'Address', error: false, errorTag: ""},
      city: {label: 'City', error: false, errorTag: ""},
      country: {label: 'Country', error: false, errorTag: ""},
      linkedInLink: {label: 'LinkedIn', error: false, errorTag: ""},
      facebookLink: {label: 'Facebook', error: false, errorTag: ""},
      twitterLink: {label: 'Twitter', error: false, errorTag: ""},
    };
  }

  private getCountries() {
    this.countryService.getList().subscribe(
      countries => this.setCountries(countries)
    )
  }

  private setCountries(countries: Country[]) {
    this.countries = countries;
    if(this.actionToPerform == 'update'){
      this.resetUpdateForm();
    }
  }

  getpeopleTitles(){
    return peopleTitles;
  }

  public reloadSubList(event){
    this.conferenceListEvent.emit({action: 'reload'})
  }

  public showAddAttendedConferenceModal(){
    this.addAttendedConferenceModal.showModal();
  }
}
