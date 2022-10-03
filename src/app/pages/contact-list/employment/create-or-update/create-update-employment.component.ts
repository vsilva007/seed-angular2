import {Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../../core/services/notificationService";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {LeadFactory} from "../../../../core/factories/LeadFactory";
import {Lead} from "../../../../core/models/lead.model";
import {ContactListService} from "../../../../core/services/contact-list.service";
import * as moment from 'moment';
import {Observable} from "rxjs";
import {SafeHtml, DomSanitizer} from "@angular/platform-browser";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'create-update-employment',
  templateUrl: './create-update-employment.component.html',
  styleUrls: ['./create-update-employment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmploymentCreateOrUpdateComponent implements OnInit {

  public formGroup: FormGroup;
  public errors = this.initErrors();
  public updateBackup: Lead;
  public parentId:string;
  public actionToPerform: string;
  private employmentId: string;
  public pickerOptions: DatePickerOptions;
  public pickerEvent : {start: EventEmitter<any>, end: EventEmitter<any>} = {start: new EventEmitter(),end: new EventEmitter()};

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private contactListService: ContactListService, private notificationService: NotificationService,
              private _sanitizer: DomSanitizer, private location: Location) {
  }

  ngOnInit(){
    this.pickerOptions = {format: 'DD/MM/YYYY', maxDate: new Date()};
    this.route.params.subscribe(
      params => this.setActionToPerform(params)
    );
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: [''],
      email: ['', Validators.required],
      phoneNumber: [''],
      date: [''],
      active: [true]
    });
  }

  private setUpdateForm(lead: Lead) {
    this.updateBackup = lead;
    this.resetUpdateForm();
  }

  private resetUpdateForm(){
    this.formGroup.controls['name'].setValue(this.updateBackup.name);
    this.formGroup.controls['surnames'].setValue(this.updateBackup.surnames);
    this.formGroup.controls['email'].setValue(this.updateBackup.email);
    this.formGroup.controls['phoneNumber'].setValue(this.updateBackup.phoneNumber);
    this.formGroup.controls['date'].setValue(this.updateBackup.date);
    this.formGroup.controls['active'].setValue(this.updateBackup.active);
    if(this.updateBackup.date){
      this.pickerEvent.start.emit({type: 'date', data: moment(this.updateBackup.date).toDate()})
    }
  }

  public submitFormGroup(){
    (this.actionToPerform == 'create') ? this.submitCreateForm() : this.submitUpdateForm();
  }

  public submitUpdateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      let employment = this.createEntity();
      employment.id=this.employmentId;
      this.contactListService.updateContact(this.parentId, employment).subscribe(
        employment => this.returnToCompanies(employment),
        error => this.notificationService.errorNotification("Company has not been updated")
      );

    }else{
      this.validateForm();
    }
  }

  public createEntity(): Lead{
    let lead = this.formGroup.value;
    if(lead.date){
      lead.date = this.getDatePickerDate(lead.date);
    }
    lead.id = null;
    return LeadFactory.createFromObject(lead);
  }

  public submitCreateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      this.contactListService.createContact(this.parentId, this.createEntity()).subscribe(
        employment => this.returnToCompanies(employment),
        error => this.notificationService.errorNotification("El contacto no se ha podido crear")
      );
    }else{
      this.validateForm();
    }
  }
  private returnToCompanies(lead: Lead) {
    this.notificationService.successNotification("El Contacto " + lead.name  + " se ha creado con éxito");
    this.location.back();
  }

  private initErrors(){
    return {
      name: {label: 'Nombre', error: false, errorTag: ""},
      email: {label: 'Email', error: false, errorTag: ""}
    };
  }

  private validateForm(){
    for(let key in this.errors){
      if(!this.formGroup.controls[key].valid){
        this.errors[key] = {error: true, errorTag: this.errors[key].label + " is mandatory"}
      }
    }
  }

  private setActionToPerform(param: any) {
    this.parentId=param['id'];
    if(!param['contactId']){
      this.actionToPerform = 'create';
      this.createForm();
    }else{
      this.actionToPerform = 'update';
      this.employmentId = param['contactId'];
      this.createForm();
      this.contactListService.getContact(this.parentId, param['contactId']).subscribe(
        company => this.setUpdateForm(company)
      );
    }
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span style='cursor: default;'>${data.legalName}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  };


  private getDatePickerDate(launchDate: DateModel): string {
    if(launchDate['momentObj']){
      return launchDate['momentObj'].format('YYYY-MM-DD');
    }else{
      return null;
    }
  }

  public onCurrentChange(event){
    if(event){
      this.formGroup.controls['endDate'].setValue('');
    }
  }

}
