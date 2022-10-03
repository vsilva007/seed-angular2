import {Injectable} from "@angular/core";
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class NotificationService {

  constructor(private _notificationService: NotificationsService) {
  }

  public successNotification(text: string): void{
    this._notificationService.success("Success", text);
  }

  public errorNotification(text: string): void{
    this._notificationService.error("Error", text);
  }

  public infoNotification(text: string): void{
    this._notificationService.success("Success", text);
  }
}
