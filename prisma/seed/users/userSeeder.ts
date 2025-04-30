import { CreateUserUseCase } from "@/features/users/application/createUserUseCase";
import { PrismaUserRepository } from "@/features/users/infrastructure/PrismaUserRepository";
import { db } from "@/lib/db";

async function main() {
  const user = {
    name: "Farrel Baty",
    email: "farrelbaty@gmail.com",
    password: "123456789",
  };
  const userRepo = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  await createUserUseCase.save(user.name, user.email, user.password);
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  });
