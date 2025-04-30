import { Role } from "@prisma/client";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
    public password: string
  ) {}
}
