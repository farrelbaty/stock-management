import { User } from "@/features/users/domain/entity/User";
import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ISupplierRepository } from "../domain/repository/SupplierRepository";

export class PrismaSupplier implements ISupplierRepository {
  public toDomain(
    raw: User & { address: string | null; phoneNumber: string | null }
  ): User & { address: string | null; phoneNumber: string | null } {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      role: raw.role,
      address: raw.address,
      phoneNumber: raw.phoneNumber,
    };
  }
  async getAllSuppliers(): Promise<User[]> {
    try {
      const suppliers = await db.user.findMany({
        where: {
          role: {
            name: "fournisseur",
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          phoneNumber: true,
          address: true,
        },
      });

      return suppliers.map(this.toDomain);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new Error(error.message);
      throw error;
    }
  }

  async getSupplier(userId: string): Promise<User | null> {
    try {
      const supplier = await db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          phoneNumber: true,
          address: true,
        },
      });

      return supplier ? this.toDomain(supplier) : null;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new Error(error.message);
      throw error;
    }
  }
}
