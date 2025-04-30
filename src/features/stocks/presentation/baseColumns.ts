"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns/format";
import { StockMovement } from "../domain/entity/stock";

export const baseColumns: ColumnDef<StockMovement>[] = [
  {
    accessorKey: "productId",
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
    cell: ({ getValue }) => {
      const rawDate = getValue<Date>();
      return rawDate ? format(new Date(rawDate), "dd/MM/yyyy") : "N/A";
    },
  },
];
