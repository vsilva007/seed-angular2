import {Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../../core/services/notificationService";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {SeniorityEnum} from "../../../../core/enumerations/SeniorityEnum";
import {EmploymentFactory} from "../../../../core/factories/EmploymentFactory";
import {Employment} from "../../../../core/models/employment.model";
import {PeopleService} from "../../../../core/services/people.service";
import * as moment from 'moment';
import {CompanyService} from "../../../../core/services/company.service";
import {Company} from "../../../../core/models/company.model";
import {Observable} from "rxjs";
import {SafeHtml, DomSanitizer} from "@angular/platform-browser";
import {AddCompanyModal} from "../../../../shared/modals/add-company/add-company.modal";
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
  public updateBackup: Employment;
  public parentId:string;
  public actionToPerform: string;
  private employmentId: string;
  public companies: Company[];
  private companyStored: Company = null;
  @ViewChild('addCompanyComponent') public addCompanyModal: AddCompanyModal;
  public pickerOptions: DatePickerOptions;
  public pickerEvent : {start: EventEmitter<any>, end: EventEmitter<any>} = {start: new EventEmitter(),end: new EventEmitter()};

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private peopleService: PeopleService, private companyService: CompanyService, private notificationService: NotificationService,
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
      finalPosition: ['', Validators.required],
      finalPositionNoah: [''],
      functionalArea: ['', Validators.required],
      seniority: ['', Validators.required],
      founder: [false, Validators.required],
      shareholder: [false, Validators.required],
      company: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      current: [false],
      boardRole: [false]
    });
    this.createCompanySearch();
  }

  private setUpdateForm(employment: Employment) {
    this.updateBackup = employment;
    this.resetUpdateForm();
  }

  private resetUpdateForm(){
    this.formGroup.controls['finalPosition'].setValue(this.updateBackup.finalPosition);
    this.formGroup.controls['finalPositionNoah'].setValue(this.updateBackup.finalPositionNoah);
    this.formGroup.controls['functionalArea'].setValue(this.updateBackup.functionalArea);
    this.formGroup.controls['seniority'].setValue(this.updateBackup.seniority);
    this.formGroup.controls['founder'].setValue(this.updateBackup.founder);
    this.formGroup.controls['shareholder'].setValue(this.updateBackup.shareholder);
    this.companyStored = this.updateBackup.company;
    this.formGroup.controls['company'].setValue(this.updateBackup.company.legalName);
    if(this.updateBackup.startDate){
      this.pickerEvent.start.emit({type: 'setDate', data: moment(this.updateBackup.startDate).toDate()})
    }
    if(this.updateBackup.endDate){
      this.pickerEvent.end.emit({type: 'setDate', data: moment(this.updateBackup.endDate).toDate()})
    }
    this.formGroup.controls['current'].setValue(this.updateBackup.current);
    this.formGroup.controls['boardRole'].setValue(this.updateBackup.boardRole);
  }

  public submitFormGroup(){
    (this.actionToPerform == 'create') ? this.submitCreateForm() : this.submitUpdateForm();
  }

  public submitUpdateForm(){
    this.errors = this.initErrors();
    if(this.validCompany(this.formGroup.controls['company'].value) && this.validateDates() && this.formGroup.valid) {
      let employment = this.createEntity();
      employment.id=this.employmentId;
      this.peopleService.updateEmployment(this.parentId, employment).subscribe(
        employment => this.returnToCompanies(employment),
        error => this.notificationService.errorNotification("Company has not been updated")
      );

    }else{
      this.validateForm();
    }
  }

  public createEntity(): Employment{
    let employment = this.formGroup.value;
    if(!(employment.company instanceof Company)) {
      employment.company = this.companyStored;
    }
    if(employment.startDate){
      employment.startDate = this.getDatePickerDate(employment.startDate);
    }
    if(employment.endDate){
      employment.endDate = this.getDatePickerDate(employment.endDate);
    }
    employment.id = null;
    employment.finalPositionNoah = employment.functionalArea + ' / ' + employment.seniority;
    return EmploymentFactory.createFromObject(employment);
  }

  public submitCreateForm(){
    this.errors = this.initErrors();
    if(this.validCompany(this.formGroup.controls['company'].value) && this.validateDates() && this.formGroup.valid) {
      this.peopleService.createEmployment(this.parentId, this.createEntity()).subscribe(
        employment => this.returnToCompanies(employment),
        error => this.notificationService.errorNotification("Employment has not been created")
      );
    }else{
      this.validateForm();
    }
  }
  private returnToCompanies(employment: Employment) {
    this.notificationService.successNotification("Employment " + employment.finalPosition  + " has successfuly been created.");
    this.location.back();
  }

  private initErrors(){
    return {
      finalPosition: {label: 'Final Position', error: false, errorTag: ""},
      finalPositionNoah: {label: 'Final Posistion Noah', error: false, errorTag: ""},
      functionalArea: {label: 'Functional Area', error: false, errorTag: ""},
      seniority: {label: 'Seniority', error: false, errorTag: ""},
      founder: {label: 'Founder', error: false, errorTag: ""},
      shareholder: {label: 'Shareholder', error: false, errorTag: ""},
      company: {label: 'Company', error: false, errorTag: ""},
      startDate: {label: 'Start date', error: false, errorTag: ""},
      endDate: {label: 'End date', error: false, errorTag: ""},
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
    if(!param['employmentId']){
      this.actionToPerform = 'create';
      this.createForm();
    }else{
      this.actionToPerform = 'update';
      this.employmentId = param['employmentId'];
      this.createForm();
      this.peopleService.getEmployment(this.parentId, param['employmentId']).subscribe(
        company => this.setUpdateForm(company)
      );
    }
  }

  getSeniorityEnum(){
    return SeniorityEnum;
  }

  private searchCompanies(search: string){
    this.companyService.getList("0", "10", "legalName,abbreviationName", search).subscribe(
      companies => this.setCompanies(companies)
    )
  }

  private restartCompany(){
    if(this.formGroup.controls['company'].value instanceof Company){
      this.errors.company.error = false;
    }
  }

  private createCompanySearch() {
    this.companies = [];
    this.formGroup.controls['company'].valueChanges.debounceTime(200).subscribe(search => {this.searchCompanies(search); this.restartCompany()});
  }

  private setCompanies(companies: any[]) {
    let something: any = companies;
    this.companies = something.data;
  }

  observableSource(keyword: any) {
    return Observable.of(this.companies);
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span style='cursor: default;'>${data.legalName}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  };

  setCompany(event: any){
    this.companyStored = event.company;
    this.formGroup.controls['company'].setValue(event.company.legalName);
  }

  private validCompany(c: any): boolean{
    if(c instanceof Company){
      return true;
    }else{
      if(!this.companyStored){
        this.errors.company = {label: 'Company', error: true, errorTag: "Company must be one of the list, you can create a new one if required."};
        return false;
      }else{
        return true;
      }
    }
  }


  validateCompany(companyStored: Company) {
    return (c: FormControl) => {
      if(c.value instanceof Company){
        return null;
      }else{
        console.info(companyStored);
        if(!companyStored){
          return {
            validateCompany: {
              valid: false
            }}
        }else{
          return null;
        }
      }
    };
  }

  public showAddCompanyModal(){
    this.addCompanyModal.showModal();
  }

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

  private validateDates() : boolean{
    if(this.formGroup.controls['current'].value){
      return (this.formGroup.controls['startDate'].value) ? true : false;
    }else{
      if(this.formGroup.controls['startDate'].value) {
        if (moment(this.formGroup.controls['startDate'].value).isBefore(moment(this.formGroup.controls['endDate'].value))) {
          return true;
        } else {
          this.errors.endDate = {
            label: 'End date',
            error: true,
            errorTag: "End date can not be less than the start date"
          };
          return false;
        }
      }else{
        return true;
      }
    }

  }

}
