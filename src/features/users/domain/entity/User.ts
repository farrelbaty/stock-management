export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: { name: string },
    public password: string
  ) {}
}
