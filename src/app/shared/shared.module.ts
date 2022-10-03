import {CommonModule} from "@angular/common";
import {ServerException} from "./components/server-exception/server-exception.component";
import {PageHeader} from "./components/page-header/page-header.component";
import {BasicTable} from "./components/basic-table/basic-table.component";
import {DeleteButton} from "./components/delete-button/delete-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EnumKeysPipe} from "./pipes/enumKeys.pipe";
import {SearchTablePipe} from "./pipes/searchTable.pipe";
import {RangePipe} from "./pipes/range.pipe";
import {TagInputModule} from "ng2-tag-input";
import {SimpleNotificationsModule} from "angular2-notifications/components";
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {SelectModule} from "angular2-select";
import {MultiselectDropdownModule} from "./components/dropdown-multiselect/dropdown-multiselect.component";
import {AddCompanyModal} from "./modals/add-company/add-company.modal";
import {Ng2AutoCompleteModule} from "ng2-auto-complete";
import {UploadImage} from "./components/upload-image/upload-image.component";
import {NgUploaderModule} from "ngx-uploader";
import {ProgressbarModule, ModalModule} from "ng2-bootstrap";
import {EnumKeysCustomPipe} from "./pipes/enumKeysCustomSelect.pipe";
import {DatePickerModule} from "ng2-datepicker";
import {UiSwitchModule} from "angular2-ui-switch";
import {AddPeopleModal} from "./modals/add-people/add-people.modal";
import {AddAttendedConferenceModal} from "./modals/add-attended-conference/add-attended-conference.modal";


@NgModule({
  imports:      [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule,
    SlimLoadingBarModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    NgUploaderModule,
    SelectModule,
    Ng2AutoCompleteModule,
  ],
  declarations: [ ServerException, PageHeader, BasicTable, DeleteButton, EnumKeysPipe, SearchTablePipe,
    RangePipe, UploadImage, AddCompanyModal, EnumKeysCustomPipe, AddPeopleModal, AddAttendedConferenceModal],
  exports:      [
    ServerException,
    PageHeader,
    BasicTable,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteButton,
    EnumKeysPipe,
    SearchTablePipe,
    RangePipe,
    TagInputModule,
    SimpleNotificationsModule,
    SlimLoadingBarModule,
    SelectModule,
    MultiselectDropdownModule,
    AddCompanyModal,
    Ng2AutoCompleteModule,
    NgUploaderModule,
    UploadImage,
    EnumKeysCustomPipe,
    DatePickerModule,
    UiSwitchModule,
    AddPeopleModal,
    AddAttendedConferenceModal,
  ]
})
export class SharedModule { }
