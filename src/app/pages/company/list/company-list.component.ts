import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../../core/services/company.service";
import {Company} from "../../../core/models/company.model";
import {NotificationService} from "../../../core/services/notificationService";

@Component({
  selector: 'company-list',
  templateUrl: 'company-list.component.html',
  styleUrls: ['company-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyListComponent implements OnInit {

  public errorMessage: any;
  public companies: Company[] = null;
  public settings: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private companyService: CompanyService, private notificationService: NotificationService) {
  }

  ngOnInit(){
    this.companyService.getList().subscribe(
      companies => this.createTableSettings(companies)
    );
    this.initDefaultTableSettings();
  }

  private createTableSettings(response: any) {
    this.setOptionTable(response);
    this.companies = response.data;
  }

  public deleteCompany(event: any){
    this.companyService.delete(event.id).subscribe(
      id => this.notificationService.successNotification("La campaña ha sido eliminada con éxito"),
      error => this.notificationService.errorNotification("No se ha podido borrar la campaña")
    )
  }

  public updateCompaniesList(event){
    this.companyService.getList(event.page, event.pageSize, event.fields, event.search).subscribe(
      companies => this.createTableSettings(companies)
    );
  }

  private setOptionTable(response: any) {
    this.settings.size = {
      pageSize: response.pageSize,
      pageSizeValues: [10, 20, 50, 100, 200]
    };
    this.settings.pagination = {
      hasNext: response.hasNext,
      hasPrev: response.hasPrev,
      pageIndex: response.pageIndex,
      totalPages: response.totalPages
    };
   this.settings.info = true;
    this.settings.search = true;
  }

  private initDefaultTableSettings() {
    this.settings = {
      columns: [
        {
          property: 'abbreviationName',
          title: 'Nombre Campaña'
        },
        {
          property: 'industry.value',
          title: 'Industry'
        },
        {
          property: 'website',
          title: 'Website'
        },
      ],
      header: 'Lista de campañas',
      subHeader: '',
      actions: {
        columnTitle: 'Actions',
        edit: {
          editRoute: '/campaings/:id/edit',
        },
        delete: {
          description: 'abbreviationName'
        }
      },
      entity: 'company'
    };
  }
}
