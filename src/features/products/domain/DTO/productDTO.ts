import { ProductType } from "@prisma/client";

export type ProductDTO = {
  name: string;
  type: ProductType;
  referenceCode: string;
  quantityInStock?: number;
  minQuantity: number;
  expiryDate: Date | null;
  description: string | null;
};
