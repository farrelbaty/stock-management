import { AddProductUseCase } from "@/features/products/application/addProductUseCase";
import { PrismaProductRepository } from "@/features/products/infrastructure/prismaProductRepository";
import { db } from "@/lib/db";
import { ProductType } from "@prisma/client";

async function main() {
  const product = {
    name: "Rame de papier",
    type: ProductType.CONSOMMABLE,
    referenceCode: "RP-2025-cdl",
    minQuantity: 5,
  };

  const productRepo = new PrismaProductRepository();

  const productUseCase = new AddProductUseCase(productRepo);

  await productUseCase.save(product);
}
main()
  .then(() => db.$disconnect)
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  });
