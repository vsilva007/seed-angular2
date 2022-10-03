import {User} from "./user.model";
import {UserFactory} from "../factories/UserFactory";

export class Session {
  public user: User;
  constructor(
    public token: string,
    userAccount: any
  ) {
    this.user = UserFactory.createFromObject(userAccount);
  }
}
