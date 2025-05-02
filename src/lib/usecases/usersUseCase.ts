import { LoginUserUseCase } from "@/features/users/application/loginUserUseCase";
import { PrismaUserRepository } from "@/features/users/infrastructure/PrismaUserRepository";

const userRepo = new PrismaUserRepository();
export const loginUserUseCase = new LoginUserUseCase(userRepo);
