import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../../core/models/user.model";
import {UserService} from "../../../core/services/user.service";
import {NotificationService} from "../../../core/services/notificationService";

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {

  public user: User = new User(null, null, null, null, null, null);
  public errorMessage: any;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(){
    this.route.params.subscribe(
      params => this.setUser(params['id'])
    )
  }

  private setUser(id: string) {
    this.userService.getUser(id).subscribe(
      user => this.user = user
    )
  }

  public deleteUser(event: any){
    this.userService.deleteUser(event.id).subscribe(
      id => this.notificationService.successNotification("The user was successfully removed"),
      error => this.notificationService.errorNotification("The user has not been successfully deleted")
    )
  }
}
