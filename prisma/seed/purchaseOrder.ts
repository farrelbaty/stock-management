import { PrismaOrderRepository } from "@/features/orders/infrastructure/prismaOrderRepository";
import { PrismaProductRepository } from "@/features/products/infrastructure/prismaProductRepository";
import { PrismaStockRepository } from "@/features/stocks/infrastructure/prismaStockRepository";
import { db } from "@/lib/db";

async function main() {
  const suppliers = await db.supplier.findMany({ select: { id: true } });
  const products = await db.product.findMany({ select: { id: true } });

  const orderRepo = new PrismaOrderRepository(
    new PrismaStockRepository(),
    new PrismaProductRepository()
  );

  const supplierId = suppliers[0].id;
  const items = products.slice(0, 2).map((p) => ({
    productId: p.id,
    quantityOrdered: 10,
  }));

  await orderRepo.createPurchaseOrder(supplierId, items);
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  });
