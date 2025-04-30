"use client";

import { baseColumns } from "@/features/stocks/presentation/columns";
import { StockMovementsTable } from "@/features/stocks/presentation/StockMovementsTable";
import { useQuery } from "@tanstack/react-query";

// export type StockMovementForDisplay = {
//   productName: string;
//   type: "ENTREE" | "SORTIE";
//   quantity: number;
//   reason?: string;
//   createdAt: string;
// };

// const mockData: StockMovementForDisplay[] = [
//   {
//     productName: "Paracétamol",
//     type: "ENTREE",
//     quantity: 100,
//     reason: "Réapprovisionnement",
//     createdAt: "2025-04-01T12:00:00Z",
//   },
//   {
//     productName: "Gants médicaux",
//     type: "SORTIE",
//     quantity: 20,
//     reason: "Utilisation urgente",
//     createdAt: "2025-04-02T15:30:00Z",
//   },
//   // ajoute plus d'entrées ici
// ];

const fetchStocks = async () => {
  const response = await fetch("/api/stocks");
  if (!response.ok) throw new Error("Erreur serveur");

  const data = await response.json();
  return data;
};

const StockMovementsPage = () => {
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["StockMovements"],
    queryFn: fetchStocks,
  });

  if (isLoading) return <div>Chargement...</div>;
  return (
    <div>
      <StockMovementsTable
        columns={baseColumns}
        data={stocks}
        searchKey="productName"
      />
    </div>
  );
};

export default StockMovementsPage;
