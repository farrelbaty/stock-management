import { MovementType } from "@/lib/utils";

export type StockDTO = {
  productId: string;
  type: MovementType;
  quantity: number;
  reason: string | null;
  doneById: string;
};
