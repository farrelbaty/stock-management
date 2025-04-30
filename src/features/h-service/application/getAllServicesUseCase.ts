import { IServiceRepository } from "../domain/repository/serviceRepository";

export class GetAllServicesUseCase {
  constructor(private serviceRepo: IServiceRepository) {}
  async execute() {
    console.log("Services dans le use case");
    return await this.serviceRepo.getAllServices();
  }
}
