import { IServiceRepository } from "../domain/repository/serviceRepository";

export class CreateServiceUseCase {
  constructor(private serviceRepo: IServiceRepository) {}

  async execute(name: string) {
    if (!name) throw new Error("Le nom du service est requis");
    const serviceExists = await this.serviceRepo.getService(name);

    if (serviceExists) throw new Error("Ce service est déjà enregistré");

    return await this.serviceRepo.createService(name);
  }
}
