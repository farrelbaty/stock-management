import { CreateStockMovementUseCase } from "@/features/stocks/application/createStockMovementUseCase";
import { PrismaStockRepository } from "@/features/stocks/infrastructure/prismaStockRepository";
import { db } from "@/lib/db";
import { MovementType } from "@/lib/utils";

type MoveType = {
  productId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  doneById: string;
};
async function main() {
  const stockRepo = new PrismaStockRepository();
  const createStockUseCase = new CreateStockMovementUseCase(stockRepo);
  const productId = "cma2e0xc40000ug38h37zunwk";

  const move: MoveType = {
    productId,
    quantity: 10,
    type: "ENTREE",
    doneById: "cma2mhh750000ugd0541n6e3i",
    reason: "Bloc opératoire",
  };
  const movement = await db.stockMovement.findUnique({
    where: { id: productId },
  });

  if (movement)
    throw new Error("Ce produit est dans déjà dans un mouvement de stock");
  await createStockUseCase.save(move);
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  });
