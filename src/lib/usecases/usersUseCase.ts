import { CreateUserUseCase } from "@/features/users/application/loginUserUseCase";
import { PrismaUserRepository } from "@/features/users/infrastructure/PrismaUserRepository";

const userRepo = new PrismaUserRepository();
export const createUserUseCase = new CreateUserUseCase(userRepo);
