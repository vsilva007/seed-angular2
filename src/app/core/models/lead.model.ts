export class Lead {

  constructor(
    public id: string,
    public name: string,
    public surnames: string,
    public email: string,
    public phoneNumber: string,
    public date: string,
    public active: boolean,
  ) {
  }
}
