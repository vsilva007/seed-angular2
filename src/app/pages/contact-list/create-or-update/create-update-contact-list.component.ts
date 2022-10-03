import {Component, OnInit, ViewEncapsulation, Input, EventEmitter, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ContactList} from "../../../core/models/contact-list.model";
import {ContactListService} from "../../../core/services/contact-list.service";
import {NotificationService} from "../../../core/services/notificationService";
import {ContactListFactory} from "../../../core/factories/ContactListFactory";
import {Country} from "../../../core/models/country.model";
import {CountryService} from "../../../core/services/country.service";
import {CompanyService} from "../../../core/services/company.service";
import { CustomValidators } from 'ng2-validation';
import {peopleTitles} from "../../../core/enumerations/peopleTitles";
import {AddAttendedConferenceModal} from "../../../shared/modals/add-attended-conference/add-attended-conference.modal";


@Component({
  selector: 'create-update-contact-list',
  templateUrl: './create-update-contact-list.component.html',
  styleUrls: ['./create-update-contact-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListCreateOrUpdateComponent implements OnInit {

  public formGroup: FormGroup;
  public actionToPerform: string;
  public errors = this.initErrors();
  public updateBackup: ContactList;
  // Value if we want to separate module contactList of company
  // @Input() public companyId: string = null;
  public companyId: string = null;
  public contactListId: string = null;
  public countries: Country[] = [];
  @ViewChild('addAttendedConferenceModal') public addAttendedConferenceModal: AddAttendedConferenceModal;
  public conferenceListEvent: EventEmitter<any> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private contactListService: ContactListService, private notificationService: NotificationService,
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
      this.contactListId = params['id'];
      this.createForm();
      this.contactListService.getContactList(this.contactListId).subscribe(
        company => this.setUpdateForm(company)
      );
    }
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: [''],
      title: [''],
      address: [''],
      city: [''],
      country: [''],
      linkedInLink: ['', CustomValidators.url],
      facebookLink: ['', CustomValidators.url],
      twitterLink: ['', CustomValidators.url],
      serviceProvider: [true],
    });
  }

  private setUpdateForm(contacList: ContactList) {
    this.updateBackup = contacList;
    this.resetUpdateForm();
  }

  private resetUpdateForm(){
    this.formGroup.controls['name'].setValue(this.updateBackup.name);
    this.formGroup.controls['surnames'].setValue(this.updateBackup.surnames);
    this.formGroup.controls['title'].setValue(this.updateBackup.title);
  }

  public submitForm(){
    (this.actionToPerform == 'create') ? this.submitCreateForm() : this.submitUpdateForm();
  }

  public submitCreateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      this.contactListService.createContactList(ContactListFactory.createFromObject(this.formGroup.value)).subscribe(
        user => this.returnToUsers(user),
        error => this.notificationService.errorNotification("ContactList has not been created")
      );
    }else{
      this.validateForm();
    }
  }

  public submitUpdateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      let contactList = ContactListFactory.createFromObject(this.formGroup.value);
      contactList.id = this.contactListId;
      this.contactListService.updateContactList(contactList).subscribe(
        user => this.returnToUsersUpdate(user),
        error => this.notificationService.errorNotification("ContactList has not been updated")
      );
    }else{
      this.validateForm();
    }
  }

  private returnToUsers(contactList: ContactList) {
    this.notificationService.successNotification("ContactList " + contactList.title + contactList.name + contactList.surnames + "has successfuly been created.");
    this.router.navigate(['/contact-list/'+contactList.id+"/edit"])
  }

  private returnToUsersUpdate(contactList: ContactList) {
    this.notificationService.successNotification("ContactList " + contactList.title + contactList.name + contactList.surnames + "has successfuly been updated.");
    this.router.navigate(['/contact-list/'+contactList.id+"/edit"])
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
