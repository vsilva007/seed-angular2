import {Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {CompanyService} from "../../../core/services/company.service";
import {Company} from "../../../core/models/company.model";
import {CompanyFactory} from "../../../core/factories/CompanyFactory";
import {AuthorizationService} from "../../../core/services/authorization.service";
import {NotificationService} from "../../../core/services/notificationService";
import {Industry} from "../../../core/models/industry.model";
import {IndustryService} from "../../../core/services/industry.service";
import {CurrentEmployeeService} from "../../../core/services/currentEmployee.service";
import {CurrentEmployee} from "../../../core/models/currentEmployee.model";
import {GeographyOfOperationsEnum} from "../../../core/enumerations/GeographyOfOperationsEnum";
import { CustomValidators } from 'ng2-validation';
import {IndustryTagService} from "../../../core/services/industryTag.service";
import {IndustryTag} from "../../../core/models/industryTag.model";
import {
  IMultiSelectOption,
  IMultiSelectSettings
} from "../../../shared/components/dropdown-multiselect/dropdown-multiselect.component";
import {MarketService} from "../../../core/services/market.service";
import {Market} from "../../../core/models/market.model";
import {AddPeopleModal} from "../../../shared/modals/add-people/add-people.modal";

@Component({
  selector: 'create-update-company',
  templateUrl: 'create-update-company.component.html',
  styleUrls: ['create-update-company.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyCreateOrUpdateComponent implements OnInit {

  public formGroup: FormGroup;
  public industries: Array<any> = [];
  public currentEmployees: Array<any> = [];
  public industryTag: Array<any> = [];
  public actionToPerform: string;
  public errors = this.initErrors();
  public updateBackup: Company;
  public currentId: string;
  public marketOptions: IMultiSelectOption[];
  public mySettings: IMultiSelectSettings;
  @ViewChild('addPeopleModal') public addPeopleModal: AddPeopleModal;
  public peopleListEvent: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private authorizationService: AuthorizationService,
              private formBuilder: FormBuilder, private companyService: CompanyService, private notificationService: NotificationService,
              private industryService: IndustryService, private currentEmployeeService: CurrentEmployeeService, private industryTagService: IndustryTagService,
              private marketService: MarketService) {
  }

  ngOnInit(){
    this.createForm();
    this.marketService.getList().subscribe(
      markets => this.setMarkets(markets)
    );
    this.currentEmployeeService.getList().subscribe(
      currentEmployee => this.setCurrentEmployee(currentEmployee)
    );
    this.industryService.getCompanySectors().subscribe(
      companySectors => this.setIndustries(companySectors)
    );
    this.route.params.subscribe(
      params => this.setActionToPerform(params)
    );
  }

  onChange() {
    console.info(this.formGroup.controls['activeMarkets'].value);
  }

  private setActionToPerform(param: any) {
    if(!param['id']){
      this.actionToPerform = 'create';
    }else{
      this.actionToPerform = 'update';
      this.companyService.get(param['id']).subscribe(
        company => this.setUpdateForm(company)
      );
      this.currentId=param['id'];
    }
  }

  onSelectedIndustry(industry: any){
    this.resetIndustryInput();
    this.industryTagService.getList(industry.value).subscribe(
      industryTags => this.setIndustryTags(industryTags)
    )
  }

  onDeselectIndustry(){
    this.resetIndustryInput();
  }

  private resetIndustryInput(){
    this.formGroup.controls['industryTags'].setValue(null);
    this.industryTag = [];
  }

  getGeographyOfOperations(){
    return GeographyOfOperationsEnum;
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      legalName: ['', Validators.required],
      abbreviationName: ['', Validators.required],
      description: [''],
      founded: [''],
      strapline: [''],
      website: ['', CustomValidators.url],
      logo: [''],
      industryTags: [''],
      linkedInLink: ['', CustomValidators.url],
      facebookLink: ['', CustomValidators.url],
      twitterLink: ['', CustomValidators.url],
      corporateEmailDomains: [],
      geographyOfOperations: [],
      currentEmployees: [''],
      industry: [''],
      serviceProvider: [false],
      activeMarkets: []
    });
  }

  private setUpdateForm(company: Company) {
    this.updateBackup = company;
    this.resetUpdateForm();
  }

  private resetUpdateForm(){
    this.formGroup.controls['legalName'].setValue((this.updateBackup.legalName) ? this.updateBackup.legalName.split(";") : null);
    this.formGroup.controls['abbreviationName'].setValue(this.updateBackup.abbreviationName);
    this.formGroup.controls['description'].setValue(this.updateBackup.description);
    this.formGroup.controls['founded'].setValue(this.updateBackup.founded);
    this.formGroup.controls['logo'].setValue(this.updateBackup.logo);
    this.formGroup.controls['industry'].setValue((this.updateBackup.industry) ? this.updateBackup.industry.id : '');
    if(this.updateBackup.industry){
      this.onSelectedIndustry({value: this.updateBackup.industry.id});
    }
    this.formGroup.controls['industryTags'].setValue(this.updateBackup.industryTags);
    this.formGroup.controls['linkedInLink'].setValue(this.updateBackup.linkedInLink);
    this.formGroup.controls['facebookLink'].setValue(this.updateBackup.facebookLink);
    this.formGroup.controls['currentEmployees'].setValue((this.updateBackup.currentEmployees) ? this.updateBackup.currentEmployees.id : '');
    this.formGroup.controls['corporateEmailDomains'].setValue((this.updateBackup.corporateEmailDomains) ? this.updateBackup.corporateEmailDomains.split(";") : null);
    this.formGroup.controls['geographyOfOperations'].setValue(this.updateBackup.geographyOfOperations);
    this.formGroup.controls['twitterLink'].setValue(this.updateBackup.twitterLink);
    this.formGroup.controls['website'].setValue(this.updateBackup.website);
    this.formGroup.controls['strapline'].setValue(this.updateBackup.strapline);
    this.formGroup.controls['serviceProvider'].setValue(this.updateBackup.serviceProvider);
    if(this.updateBackup.activeMarkets){
      let activeMarkets = [];
      this.updateBackup.activeMarkets.forEach((item) => activeMarkets.push(item.id));
      this.formGroup.controls['activeMarkets'].setValue(activeMarkets);
    }
  }

  public submitFormGroup(){
    (this.actionToPerform == 'create') ? this.submitCreateForm() : this.submitUpdateForm();
  }

  public submitCreateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      this.companyService.create(this.setCompanyObject()).subscribe(
          company => this.goToEdit(company),
          error => this.notificationService.errorNotification("Company has not been created")
        );
    }else{
      this.validateForm();
    }
  }

  private setCompanyObject(): Company{
    let auxCompany = this.formGroup.value;
    auxCompany.corporateEmailDomains = this.parseTagsToList(this.formGroup.controls['corporateEmailDomains'].value);
    auxCompany.legalName = this.parseTagsToList(this.formGroup.controls['legalName'].value);
    if(this.actionToPerform == 'update') {
      auxCompany.id = this.currentId;
    }
    auxCompany.currentEmployees = (this.formGroup.controls['currentEmployees'].value) ? new CurrentEmployee(this.formGroup.controls['currentEmployees'].value) : null;
    auxCompany.industry = (this.formGroup.controls['industry'].value) ? new Industry(this.formGroup.controls['industry'].value) : null;
    if(this.formGroup.controls['activeMarkets'].value !== 'undefined' && this.formGroup.controls['activeMarkets'].value !== null){
      auxCompany.activeMarkets = [];
      this.formGroup.controls['activeMarkets'].value.forEach((item) => {auxCompany.activeMarkets.push({id: item, iso: '', code: '', name: ''})})
    }
    return CompanyFactory.createFromObject(auxCompany);
  }

  public submitUpdateForm(){
    this.errors = this.initErrors();
    if(this.formGroup.valid) {
      this.companyService.update(this.setCompanyObject()).subscribe(
        company => this.reloadCompany(company),
        error => this.notificationService.errorNotification("Company has not been updated")
      );

    }else{
      this.validateForm();
    }
  }

  private goToEdit(company: Company) {
    this.notificationService.successNotification("La  " + company.abbreviationName  + " has successfuly been created.");
    this.router.navigate(['/companies/' + company.id + '/edit'])
  }

  private reloadCompany(company: Company) {
    this.notificationService.successNotification("Company " + company.abbreviationName + " has successfuly been updated.");
    window.scrollTo(0, 0);
    this.setUpdateForm(company);
  }

  private validateForm(){
    for(let key in this.errors){
      if(!this.formGroup.controls[key].valid){
        this.errors[key].error = true;
        this.errors[key].errorTag = this.errors[key].label + " is mandatory";
      }
    }
  }

  private parseTagsToList(tags: any) : string[]{
    let stringTags: string[] = [];
    if(tags) {
      tags.forEach((item) => (typeof item === "string") ? stringTags.push(item) : stringTags.push(item.display));
    }
    return stringTags;
  }

  public transform(item: string): string {
    return (item.indexOf('@') !== 0) ? `@${item}` : item;
  }

  private initErrors(){
    return {
      website: {label: 'Website', error: false, errorTag: ""},
      founded: {label: 'Founded', error: false, errorTag: ""},
      abbreviationName: {label: 'Nombre de campaña', error: false, errorTag: ""},
      legalName: {label: 'Etiquetas relacionadas', error: false, errorTag: ""},
      linkedInLink: {label: 'LinkedIn', error: false, errorTag: ""},
      facebookLink: {label: 'Facebook', error: false, errorTag: ""},
      twitterLink: {label: 'Twitter', error: false, errorTag: ""},
    };
  }

  private setIndustryTags(industryTags: IndustryTag[]) {
    let options: Array<any> = [];
    industryTags.forEach((item) => options.push({id: item.id, value: item.value}));
    this.industryTag = options.slice(0);
    this.checkIndustrySelect();
  }

  private checkIndustrySelect(){
    if(this.updateBackup && !this.formGroup.controls['industry'].value){
      this.formGroup.controls['industry'].setValue((this.updateBackup.industry) ? this.updateBackup.industry.id : '');
      if(this.updateBackup.industry){
        this.onSelectedIndustry({value: this.updateBackup.industry.id});
      }
    }
  }

  private setIndustries(industries: Industry[]) {
    let options: Array<any> = [];
    industries.forEach((item) => options.push({value: item.id, label: item.value}));
    this.industries = options.slice(0);
  }

  private setCurrentEmployee(currentEmployee: CurrentEmployee[]) {
    let options: Array<any> = [];
    currentEmployee.sort((a, b) => a.indexOrder - b.indexOrder);
    currentEmployee.forEach((item) => options.push({value: item.id, label: item.value}));
    this.currentEmployees = options.slice(0);
  }

  private setMarkets(markets: Market[]) {
    this.mySettings = {
      pullRight: false,
      enableSearch: true,
      checkedStyle: 'checkboxes',
      buttonClasses: 'btn btn-default',
      selectionLimit: 0,
      closeOnSelect: false,
      showCheckAll: true,
      showUncheckAll: true,
      dynamicTitleMaxItems: 3,
      maxHeight: '300px',
    };
    this.marketOptions = [];
    markets.forEach(
      (item) => {
        this.marketOptions.push({id: item.id, name: item.value, isLabel: true, checked: false});
        item.countries.forEach((country) => this.marketOptions.push({id: country.id, name: country.name, parentId: item.id, isLabel: false}))
      }
    );
  }

  public showAddPeopleModal(){
    this.addPeopleModal.showModal();
  }

  public reloadPeople(event){

  }

  private updatedImage(tmpImg){
    this.formGroup.controls['logo'].setValue(tmpImg);
  }

  public reloadSubList(event){
    this.peopleListEvent.emit({action: 'reload'})
  }
}
