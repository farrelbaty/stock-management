import { IStockRepository } from "../domain/repository/stockRepository";

export class GetStocksUseCase {
  constructor(private stockRepo: IStockRepository) {}
  async getStocks() {
    const stocks = await this.stockRepo.getAllStockMovements();

    return stocks;
  }
}
