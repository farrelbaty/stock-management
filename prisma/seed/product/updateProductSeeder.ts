import { GetProductUseCase } from "@/features/products/application/getProductUseCase";
import { UpdateProductUseCase } from "@/features/products/application/updateProductUseCase";
import { PrismaProductRepository } from "@/features/products/infrastructure/prismaProductRepository";
import { db } from "@/lib/db";

async function main() {
  const productRepo = new PrismaProductRepository();
  const updateProductUseCase = new UpdateProductUseCase(productRepo);
  const getProductUseCase = new GetProductUseCase(productRepo);

  const product = await getProductUseCase.execute("cma2e0xc40000ug38h37zunwk");
  if (product) {
    product.minQuantity = 100;

    await updateProductUseCase.execute("cma2e0xc40000ug38h37zunwk", product);
  }
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  });
