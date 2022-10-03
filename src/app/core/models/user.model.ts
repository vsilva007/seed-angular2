export class User {

  constructor(
    public id: string,
    public name: string,
    public surnames: string,
    public email: string,
    public password?: string,
    public role?: Role[],
  ) {  }
}

export class Role {
  constructor(
    public name: string
  ){}
}

