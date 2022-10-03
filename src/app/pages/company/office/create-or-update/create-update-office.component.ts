import {Component, OnInit, ViewEncapsulation, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../../core/services/notificationService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfficeService} from "../../../../core/services/office.service";
import {OfficeFactory} from "../../../../core/factories/OfficeFactory";
import {Office} from "../../../../core/models/office.model";
import {OfficeTypeEnum} from "../../../../core/enumerations/OfficeTypeEnum";
import * as moment from 'moment';
import {CountryService} from "../../../../core/services/country.service";
import {Country} from "../../../../core/models/country.model";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'create-update-office',
  templateUrl: './create-update-office.component.html',
  styleUrls: ['./create-update-office.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfficeCreateOrUpdateComponent implements OnInit {

  public formGroup: FormGroup;
  public errors = this.initErrors();
  public updateBackup: Office;
  public parentCompany:string;
  public actionToPerform: string;
  private officeId: string;
  public countries: Country[] = [];
  public pickerOptions: DatePickerOptions;
  public pickerEvent: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private officeService: OfficeService, private notificationService: NotificationService,
              private countryService: CountryService) {
  }

  ngOnInit(){
    this.pickerOptions = {format: 'DD/MM/YYYY'};
    this.route.params.subscribe(
      params => this.setActionToPerform(params)
    );
    this.getCountries();
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      type: ['', Validators.required],
      launchDate: [],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      number: [''],
      postCode: [''],
      city: [''],
      country: [''],
      geolocation: ['']
    });
  }

  private setUpdateForm(office: Office) {
    this.updateBackup = office;
    this.resetUpdateForm();
  }

  private resetUpdateForm(){
    this.formGroup.controls['type'].setValue(this.updateBackup.type);
    if(this.updateBackup.launchDate){
      this.pickerEvent.emit({type: 'setDate', data: moment(this.updateBackup.launchDate).toDate()})
    }
    this.formGroup.controls['addressLine1'].setValue(this.updateBackup.addressLine1);
    this.formGroup.controls['addressLine2'].setValue(this.updateBackup.addressLine2);
    this.formGroup.controls['number'].setValue(this.updateBackup.number);
    this.formGroup.controls['postCode'].setValue(this.updateBackup.postCode);
    this.formGroup.controls['city'].setValue(this.updateBackup.city);
    this.formGroup.controls['country'].setValue((this.updateBackup.country) ? this.countries.filter(item => item.id === this.updateBackup.country.id)[0] : null);
    this.formGroup.controls['geolocation'].setValue(this.updateBackup.geolocation);
  }

  public submitFormGroup(){
    (this.actionToPerform == 'create') ? this.submitCreateForm() : this.submitUpdateForm();
  }

  public submitUpdateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      let office = this.createObject();
      office.id=this.officeId;
      this.officeService.update(this.parentCompany, office).subscribe(
        office => this.returnToCompanies(office),
        error => this.notificationService.errorNotification("Company has not been updated")
      );

    }else{
      this.validateForm();
    }
  }

  private createObject(): Office{
    let office: any = this.formGroup.value;
    if(office.launchDate){
      office.launchDate = this.getDatePickerDate(office.launchDate);
    }
    return OfficeFactory.createFromObject(this.formGroup.value);
  }

  public submitCreateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      this.officeService.create(this.parentCompany, this.createObject()).subscribe(
        office => this.returnToCompanies(office),
        error => this.notificationService.errorNotification("Office has not been created")
      );
    }else{
      this.validateForm();
    }
  }
  private returnToCompanies(office: Office) {
    this.notificationService.successNotification("Office " + office.type  + " has successfuly been created.");
    this.router.navigate(['/companies/'+ this.parentCompany+'/edit'])
  }

  private initErrors(){
    return {
      type: {label: 'Type', error: false, errorTag: ""},
      addressLine1: {label: 'Address 1', error: false, errorTag: ""},
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
    this.parentCompany=param['id'];
    if(!param['officeId']){
      this.actionToPerform = 'create';
      this.createForm();
    }else{
      this.actionToPerform = 'update';
      this.officeId = param['officeId'];
      this.createForm();
      this.officeService.get(this.parentCompany, param['officeId']).subscribe(
        company => this.setUpdateForm(company)
      );
    }
  }

  getTypeOffice(){
    return OfficeTypeEnum;
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

  private getDatePickerModel(launchDate: any): DateModel {
    let finalDate = moment(launchDate);
    let dateObject: DateModel = {
      day: finalDate.day().toString(),
      month: finalDate.month().toString(),
      year: finalDate.year().toString(),
      formatted: finalDate.format('DD/MM/YYYY'),
      momentObj: finalDate};
    return dateObject;
  }

  private getDatePickerDate(launchDate: DateModel): string {
    if(launchDate['momentObj']){
      return launchDate['momentObj'].format('YYYY-MM-DD');
    }else{
      return null;
    }
  }
}
