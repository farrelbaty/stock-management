import { TableComponent } from "@/components/shared/TabelComponent";
import { getStocksUseCase } from "@/lib/usecases/stockUseCases";

import { ColumnDef } from "@tanstack/react-table";

type StockMovement = {
  productName: string;
  type: "ENTREE" | "SORTIE";
  quantity: number;
  reason?: string;
  createdAt: string;
};

const baseColumns: ColumnDef<StockMovement>[] = [
  {
    accessorKey: "productName",
    header: "Produit",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "quantity",
    header: "Quantité",
  },
  {
    accessorKey: "reason",
    header: "Raison",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];

const StockMovementsPage = async () => {
  const stocks = await getStocksUseCase.getStocks();
  console.log(stocks);
  return (
    <div>
      <TableComponent data={stocks} columns={baseColumns} />
    </div>
  );
};

export default StockMovementsPage;
