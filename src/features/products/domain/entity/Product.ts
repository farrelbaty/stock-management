export class Product {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public referenceCode: string,
    public quantityInStock: number,
    public minQuantity: number,
    public expiryDate: Date,
    public description?: string
  ) {}
}
