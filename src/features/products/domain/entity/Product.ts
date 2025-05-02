import { ProductType } from "@prisma/client";

export class Product {
  constructor(
    public id: string,
    public name: string,
    public type: ProductType,
    public referenceCode: string,
    public quantityInStock: number,
    public minQuantity: number,
    public expiryDate: Date | null = null,
    public description: string | null = null
  ) // public supplierId: string | null
  {}
}
