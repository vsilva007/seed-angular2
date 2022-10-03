import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Company} from "../../../core/models/company.model";
import {CompanyService} from "../../../core/services/company.service";

@Component({
  selector: 'user-detail',
  templateUrl: 'company-detail.component.html',
  styleUrls: ['company-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyDetailComponent implements OnInit {

  public user: Company;
  public errorMessage: any;

  constructor(private route: ActivatedRoute, private router: Router, private companyService: CompanyService) {
  }

  ngOnInit(){
    this.route.params.subscribe(
      params => this.setUser(params['id'])
    )
  }

  private setUser(id: string) {
    this.companyService.get(id).subscribe(
      user => this.user = user
    )
  }
}
