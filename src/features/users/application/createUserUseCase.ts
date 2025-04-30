import { IUserRepository } from "../domain/repository/UserRepository";

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async save(name: string, email: string, roleId: string, password: string) {
    await this.userRepo.registerUser(name, email, roleId, password);
  }
}
