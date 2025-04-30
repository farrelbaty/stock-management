import { CreateUserUseCase } from "@/features/users/application/loginUserUseCase";
import { PrismaUserRepository } from "@/features/users/infrastructure/PrismaUserRepository";
import { db } from "@/lib/db";

async function main() {
  const user = {
    name: "Fournisseur 3",
    email: "fournisseur3@gmail.com",
    roleId: "cma3md0hk0001ugook2y721bq",
    password: "123456789",
  };

  const userRepo = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const userCreated = await createUserUseCase.save(
    user.name,
    user.email,
    user.roleId,
    user.password
  );

  console.log(userCreated);
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  });
