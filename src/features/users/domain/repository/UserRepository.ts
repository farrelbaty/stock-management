import { User } from "../entity/User";

export interface IUserRepository {
  logInUser(email: string, password: string): Promise<Omit<User, "password">>;

  registerUser(
    name: string,
    email: string,
    roleId: string,
    password: string
  ): Promise<void>;
}
