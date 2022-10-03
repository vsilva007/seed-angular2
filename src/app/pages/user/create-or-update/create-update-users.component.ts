import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {AuthorizationService} from "../../../core/services/authorization.service";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {UserFactory} from "../../../core/factories/UserFactory";
import {NotificationService} from "../../../core/services/notificationService";


@Component({
  selector: 'create-update-users',
  templateUrl: './create-update-users.component.html',
  styleUrls: ['./create-update-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserCreateOrUpdateComponent implements OnInit {

  public formUser: FormGroup;
  public actionToPerform: string;
  public serverError: any;
  public errors = {name: {error: false, errorTag: ""}, surnames: {error: false, errorTag: ""}, email: {error: false, errorTag: ""},  password: {error: false, errorTag: ""}};
  public updateBackup: User;

  constructor(private route: ActivatedRoute, private router: Router,  private authorizationService: AuthorizationService,
              private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(){
    this.route.params.subscribe(
      params => this.setActionToPerform(params)
    )
  }

  private setActionToPerform(param: any) {
    if(!param['id']){
      this.actionToPerform = 'create';
      this.createForm();
    }else{
      this.actionToPerform = 'update';
      this.updateForm();
      this.userService.getUser(param['id']).subscribe(
        user => this.setUpdateUserForm(user)
      )
    }
  }

  createForm(){
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  updateForm(){
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  private setUpdateUserForm(user: User) {
    this.updateBackup = user;
    this.resetUpdateForm();
  }

  private resetUpdateForm(){
    this.formUser.controls['name'].setValue(this.updateBackup.name);
    this.formUser.controls['surnames'].setValue(this.updateBackup.surnames);
    this.formUser.controls['email'].setValue(this.updateBackup.email);
  }

  public submitUserForm(){
    (this.actionToPerform == 'create') ? this.submitCreateUserForm() : this.submitUpdateUserForm();
  }

  public submitCreateUserForm(){
    this.errors = {name: {error: false, errorTag: ""}, surnames: {error: false, errorTag: ""}, email: {error: false, errorTag: ""},  password: {error: false, errorTag: ""}};
    if(this.formUser.valid) {
        this.userService.createUser(UserFactory.createFromObject(this.formUser.value)).subscribe(
          user => this.returnToUsers(user),
          error => this.notificationService.errorNotification("User has not been created")
        );
    }else{
      if(!this.formUser.controls["name"].valid){
        this.errors.name = {error: true, errorTag: "Name is mandatory"}
      }
      if(!this.formUser.controls["surnames"].valid){
        this.errors.surnames = {error: true, errorTag: "Surnames is mandatory"}
      }
      if(!this.formUser.controls["email"].valid){
        this.errors.email = {error: true, errorTag: "Email is mandatory"}
      }
      if (!this.formUser.controls["password"].valid) {
        this.errors.password = {error: true, errorTag: "Password is mandatory"}
      }
    }
  }

  public submitUpdateUserForm(){
    this.errors = {name: {error: false, errorTag: ""}, surnames: {error: false, errorTag: ""}, email: {error: false, errorTag: ""},  password: {error: false, errorTag: ""}};
    if(this.formUser.valid) {
      this.userService.updateUser(UserFactory.createFromObject(this.formUser.value)).subscribe(
        user => this.returnToUsersUpdate(user),
        error => this.notificationService.errorNotification("User has not been updated")
      );
    }else{
      if(!this.formUser.controls["name"].valid){
        this.errors.name = {error: true, errorTag: "Name is mandatory"}
      }
      if(!this.formUser.controls["surnames"].valid){
        this.errors.surnames = {error: true, errorTag: "Surnames is mandatory"}
      }
      if(!this.formUser.controls["email"].valid){
        this.errors.email = {error: true, errorTag: "Email is mandatory"}
      }
    }
  }

  private returnToUsers(user: User) {
    this.notificationService.successNotification("User " + user.name + user.surnames + "has successfuly been created.");
    this.router.navigate(['/users'])
  }

  private returnToUsersUpdate(user: User) {
    this.notificationService.successNotification("User " + user.name + user.surnames + "has successfuly been updated.");
    this.router.navigate(['/users'])
  }
}
