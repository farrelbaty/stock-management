import { User } from "@/features/users/domain/entity/User";

export interface ISupplierRepository {
  getAllSuppliers(): Promise<User[]>;
  getSupplier(userId: string): Promise<User | null>;
}
