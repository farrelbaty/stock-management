import { AddProductUseCase } from "@/features/products/application/addProductUseCase";
import { CountProductUseCase } from "@/features/products/application/countProductUseCase";
import { DeleteProductUseCase } from "@/features/products/application/deleteProductUseCase";
import { GetAllProductsUseCase } from "@/features/products/application/getAllProductsUseCase";
import { GetProductUseCase } from "@/features/products/application/getProductUseCase";
import { UpdateProductUseCase } from "@/features/products/application/updateProductUseCase";
import { PrismaProductRepository } from "@/features/products/infrastructure/prismaProductRepository";

const productRepo = new PrismaProductRepository();

export const addProductUseCase = new AddProductUseCase(productRepo);
export const getAllProductsUseCase = new GetAllProductsUseCase(productRepo);
export const getProductUseCase = new GetProductUseCase(productRepo);
export const updateProductUseCase = new UpdateProductUseCase(productRepo);
export const deleteProductUseCase = new DeleteProductUseCase(productRepo);
export const countProductUseCase = new CountProductUseCase(productRepo);
