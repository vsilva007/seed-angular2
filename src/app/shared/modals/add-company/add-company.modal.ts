import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Company} from "../../../core/models/company.model";
import {IndustryService} from "../../../core/services/industry.service";
import {CompanyService} from "../../../core/services/company.service";
import {NotificationService} from "../../../core/services/notificationService";
import {Industry} from "../../../core/models/industry.model";

@Component({
  selector: 'add-company-modal',
  templateUrl: 'add-company.modal.html',
  styleUrls: ['add-company.modal.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddCompanyModal implements OnInit {

  @ViewChild('addCompanyModal') addCompanyModal;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  public formGroup: FormGroup;
  public errors = this.initErrors();
  public industries: Array<any> = [];

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private notificationService: NotificationService, private industryService: IndustryService) {
  }

  ngOnInit() {
    this.industryService.getCompanySectors().subscribe(
      companySectors => this.setIndustries(companySectors)
    );
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      abbreviationName: ['', Validators.required],
      industry: ['', Validators.required],
    });
  }

  public submitFormGroup() {
    this.errors = this.initErrors();
    if (this.formGroup.valid) {
      let fastCompany = this.formGroup.value;
      fastCompany.industry = (this.formGroup.controls['industry'].value) ? new Industry(this.formGroup.controls['industry'].value) : null;
      fastCompany.legalName = fastCompany.abbreviationName;
      this.companyService.createFast(fastCompany).subscribe(
        company => this.sendCompany(company),
        error => this.notificationService.errorNotification("Company has not been created")
      );
    } else {
      this.validateForm();
    }
  }

  public sendCompany(company: Company){
    this.notificationService.successNotification("Company " + company.abbreviationName  + " has successfuly been created.");
    this.onSave.emit({company: company});
    this.addCompanyModal.hide();
  }

  private validateForm() {
    for (let key in this.errors) {
      if (!this.formGroup.controls[key].valid) {
        this.errors[key] = {error: true, errorTag: this.errors[key].label + " is mandatory"}
      }
    }
  }

  private initErrors() {
    return {
      abbreviationName: {label: 'NOAH Company Name', error: false, errorTag: ""},
      industry: {label: 'Industry', error: false, errorTag: ""}
    };
  }

  private setIndustries(industries: Industry[]) {
    let options: Array<any> = [];
    industries.forEach((item) => options.push({value: item.id, label: item.value}));
    this.industries = options.slice(0);
  }


  public showModal(){
    this.addCompanyModal.show();
  }
}
