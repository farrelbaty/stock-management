import { PrismaOrderRepository } from "@/features/orders/infrastructure/prismaOrderRepository";
import { PrismaProductRepository } from "@/features/products/infrastructure/prismaProductRepository";
import { PrismaStockRepository } from "@/features/stocks/infrastructure/prismaStockRepository";

import { CreateOrderUseCase } from "@/features/orders/application/createOrderUseCase";
import { DeleteOrderUseCase } from "@/features/orders/application/deleteOrderUseCase";
import { GetOrdersUseCase } from "@/features/orders/application/getOrdersUseCase";
import { ReceiveOrderUseCase } from "@/features/orders/application/receiveOrderUseCase";
import { UpdateOrderUseCase } from "@/features/orders/application/updateOrderUseCase";

// Dépendances
const productRepo = new PrismaProductRepository();
const stockRepo = new PrismaStockRepository();
const orderRepo = new PrismaOrderRepository(stockRepo, productRepo);

// UseCases instanciés
export const createOrderUseCase = new CreateOrderUseCase(orderRepo);
export const receiveOrderUseCase = new ReceiveOrderUseCase(orderRepo);
export const updateOrderUseCase = new UpdateOrderUseCase(orderRepo);
export const deleteOrderUseCase = new DeleteOrderUseCase(orderRepo);
export const getOrdersUseCase = new GetOrdersUseCase(orderRepo);
