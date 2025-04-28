import { BaseRepository } from "@/features/shared/domain/repositories/baseRepository";
import { User } from "../entity/User";

export interface IUserRepository extends BaseRepository<User> {
  logInUser(): void;
  registerUser(): Promise<Omit<User, "password">>;
}
