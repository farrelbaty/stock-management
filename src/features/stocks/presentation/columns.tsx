import { ColumnDef } from "@tanstack/react-table";

export type StockMovement = {
  productName: string;
  type: "ENTREE" | "SORTIE";
  quantity: number;
  reason?: string;
  createdAt: string;
};

export const baseColumns: ColumnDef<StockMovement>[] = [
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
