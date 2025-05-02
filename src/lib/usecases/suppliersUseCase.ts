import { GetSupplierUseCase } from "@/features/suppliers/application/getSupplierUseCase";
import { PrismaSupplier } from "@/features/suppliers/infrastructure/prismaSupplierRepository";

const supplierRepo = new PrismaSupplier();

export const getSuppliersUseCase = new GetSupplierUseCase(supplierRepo);
