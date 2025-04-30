"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns/format";
import { Order } from "../domain/entity/Order";

export const commandeColumns: ColumnDef<Order>[] = [
  { accessorKey: "reference", header: "Reférence" },
  { accessorKey: "supplier", header: "Fournisseur" },
  {
    accessorKey: "orderDate",
    header: "Date d'émission",
    cell: ({ getValue }) => {
      const rawDate = getValue<Date>();
      return rawDate ? format(new Date(rawDate), "dd/MM/yyyy") : "N/A";
    },
  },
  { accessorKey: "status", header: "Statut" },
  {
    accessorKey: "deliveryDate",
    header: "Date de réception",
    cell: ({ getValue }) => {
      const rawDate = getValue<Date>();
      return rawDate ? format(new Date(rawDate), "dd/MM/yyyy") : "N/A";
    },
  },
];
