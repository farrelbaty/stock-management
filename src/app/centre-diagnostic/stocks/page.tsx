import { TableComponent } from "@/components/shared/TabelComponent";

import { baseColumns } from "@/features/stocks/presentation/baseColumns";
import { getStocksUseCase } from "@/lib/usecases/stockUseCases";
import { Plus } from "lucide-react";
import Link from "next/link";

const StockMovementsPage = async () => {
  const stocks = await getStocksUseCase.getStocks();
  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Mouvements de stocks</h1>
        <Link
          href="/centre-diagnostic/stocks/destockage"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded cursor-pointer font-bold"
        >
          <Plus size={20} /> Déstocker
        </Link>
      </div>
      <TableComponent data={stocks} columns={baseColumns} />
    </div>
  );
};

export default StockMovementsPage;
