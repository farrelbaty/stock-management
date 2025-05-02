import { ISupplierRepository } from "../domain/repository/SupplierRepository";

export class GetSupplierUseCase {
  constructor(private supplierRepo: ISupplierRepository) {}

  async getAllSuppliersUseCase() {
    return await this.supplierRepo.getAllSuppliers();
  }

  async getSupplierUseCase(userId: string) {
    if (!userId) throw new Error("L'identifiant du fournisseur est requis");
    return await this.supplierRepo.getSupplier(userId);
  }
}
