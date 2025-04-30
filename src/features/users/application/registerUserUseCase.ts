import { IUserRepository } from "../domain/repository/UserRepository";

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(name: string, email: string, roleId: string, password: string) {
    return await this.userRepo.registerUser(name, email, roleId, password);
  }
}
