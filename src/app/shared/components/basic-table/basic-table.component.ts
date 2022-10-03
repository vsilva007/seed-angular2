import {Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, ChangeDetectorRef,} from '@angular/core';
import {FormControl} from "@angular/forms";
// import '../../../public/vendors/datatables.net/js/jquery.dataTables.min.js';

@Component({
  selector: 'basic-table',
  templateUrl: 'basic-table.component.html',
  styleUrls: ['basic-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BasicTable implements OnInit {

  @Input() public settings: any = {info: false, pagination: {}, search: false, size: {}};
  @Input() public source: any = null;
  @Output() deletedConfirmed: EventEmitter<any> = new EventEmitter();
  @Output() updateData: EventEmitter<any> = new EventEmitter();
  // private isLoaded: Boolean = false;
  private table: any;
  public entries: number;
  public pagination: any = {page: 0, pageSize: 50};
  public searchTableInput: FormControl = new FormControl();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(){
    this.searchTableInput.valueChanges.debounceTime(400).subscribe(search => this.searchBox(search));
    // this.isLoaded = true;
  }

  public confirmedDelete(event, rowIndex){
    this.source.splice(rowIndex, 1);
    this.deletedConfirmed.emit({id: event.id});
    this.changeDetectorRef.detectChanges();
  }

  public updatePageSize(option: any){
    this.source = null;
    this.settings.info = false;
    this.settings.paginate = null;
    if(this.searchTableInput && this.searchTableInput.value){
      this.updateData.emit({pageSize: option, page: 0, fields: this.settings.columns.map(function(a) {return a.property;}), search: this.searchTableInput.value})
    }else{
      this.updateData.emit({pageSize: option, page: 0})
    }
  }

  public updatePagination(page: any){
    if(this.searchTableInput && this.searchTableInput.value){
      this.updateData.emit({pageSize: this.settings.size.pageSize, page: page, fields: this.settings.columns.map(function(a) {return a.property;}), search: this.searchTableInput.value});
    }else{
      this.updateData.emit({pageSize: this.settings.size.pageSize, page: page});
    }
  }

  public searchBox(search: string){
    this.updateData.emit({pageSize: this.settings.size.pageSize, page: this.pagination.page, fields: this.settings.columns.map(function(a) {return a.property;}), search: search})
  }

  public parseProperties(object: any, properties: string): string{
    let propertiesGroup = properties.split(".");
    if(propertiesGroup.length == 2){
      return (object[propertiesGroup[0]] != null) ? object[propertiesGroup[0]][propertiesGroup[1]] : '';
    }else if(propertiesGroup.length == 1){
      return (object[propertiesGroup[0]] != null) ? object[propertiesGroup[0]] : '';
    }else{
      return "";
    }
  }

  private resetSource(){
    this.source = null;
  }
}
