import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {NotificationService} from "../../../core/services/notificationService";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  public errorMessage: any;
  public users: User[] = null;
  public settings: any;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(){
    this.userService.getUsers().subscribe(
      users => this.createTableSettings(users)
    );
    this.settings = {
      search: false,
      pagination: false,
      ordering: false,
      info: false,
      entity: 'user',
      header: 'Users List',
      subHeader: '',
      columns: [
        {
          property: 'name',
          title: 'Name',
          // filter: false
        },
        {
          property: 'surnames',
          title: 'Surname',
          // filter: false
        },
        {
          property: 'email',
          title: 'Email',
          // filter: false
        }
      ],
      actions: {
        columnTitle: 'Actions',
        // edit: {
        //   editRoute: '/users/:id/edit',
        // },
        delete: {
          description: 'name'
        },
        view: {
          viewRoute: '/users/:id/view'
        }
        // position: 'left' // left|right
      },
      // entries: {
      //   default: 50,
      //   options: [10, 20, 50, 100]
      // }
    };
  }

  private createTableSettings(users: User[]) {
    this.users = users;
  }

  public deleteUser(event: any){
    this.userService.deleteUser(event.id).subscribe(
      id => this.notificationService.successNotification("The user was successfully removed"),
      error => this.notificationService.errorNotification("The user has not been successfully deleted")
    )
  }
}
