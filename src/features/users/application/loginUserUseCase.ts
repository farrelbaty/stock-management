import { IUserRepository } from "../domain/repository/UserRepository";

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async save(email: string, password: string) {
    await this.userRepo.logInUser(email, password);
  }
}
