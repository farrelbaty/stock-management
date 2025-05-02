import { LoginUserUseCase } from "@/features/users/application/loginUserUseCase";
import { RegisterUserUseCase } from "@/features/users/application/registerUserUseCase";
import { PrismaUserRepository } from "@/features/users/infrastructure/PrismaUserRepository";

const userRepo = new PrismaUserRepository();
export const loginUserUseCase = new LoginUserUseCase(userRepo);
export const registerUserUseCase = new RegisterUserUseCase(userRepo);
