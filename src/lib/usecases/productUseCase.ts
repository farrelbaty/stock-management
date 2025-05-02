import { AddProductUseCase } from "@/features/products/application/addProductUseCase";
import { CountProductUseCase } from "@/features/products/application/countProductUseCase";
import { DeleteProductUseCase } from "@/features/products/application/deleteProductUseCase";
import { GetAllProductsByServiceUseCase } from "@/features/products/application/getAllProductsByServiceUseCase";
import { GetAllProductsBySupplierUseCase } from "@/features/products/application/getAllProductsBySupplierUseCase";
import { GetAllProductsUseCase } from "@/features/products/application/getAllProductsUseCase";
import { GetProductPurchasedByStructure } from "@/features/products/application/getProductsPurchasedByStructureUseCase";
import { GetProductUseCase } from "@/features/products/application/getProductUseCase";
import { UpdateProductQuantityUseCase } from "@/features/products/application/updateProductQuantityUseCase";
import { PrismaProductRepository } from "@/features/products/infrastructure/prismaProductRepository";

const productRepo = new PrismaProductRepository();

export const addProductUseCase = new AddProductUseCase(productRepo);
export const getAllProductsUseCase = new GetAllProductsUseCase(productRepo);
export const getProductUseCase = new GetProductUseCase(productRepo);
export const updateProductUseCase = new UpdateProductQuantityUseCase(
  productRepo
);
export const deleteProductUseCase = new DeleteProductUseCase(productRepo);
export const countProductUseCase = new CountProductUseCase(productRepo);
export const getAllProductsByServiceUseCase =
  new GetAllProductsByServiceUseCase(productRepo);

export const getProductsPurchasedByStructure =
  new GetProductPurchasedByStructure(productRepo);

export const getAllProductsBySupplierUseCase =
  new GetAllProductsBySupplierUseCase(productRepo);
