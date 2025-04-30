import { CreateServiceUseCase } from "@/features/h-service/application/createServiceUseCase";
import { GetAllServicesUseCase } from "@/features/h-service/application/getAllServicesUseCase";
import { PrismaServiceRepository } from "@/features/h-service/infrastructure/prismaServiceRepository";

const serviceRepo = new PrismaServiceRepository();

export const createServiceUseCase = new CreateServiceUseCase(serviceRepo);
export const getAllServicesUseCase = new GetAllServicesUseCase(serviceRepo);
