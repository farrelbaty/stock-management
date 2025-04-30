"use client";

import { CustomColumnDef } from "@/app/centre-diagnostic/produits/page";
import { ProductType } from "@/lib/utils";
import { format } from "date-fns/format";

type TypeProduct = {
  referenceCode: string;
  name: string;
  type: ProductType;
  quantityInStock: number;
  minQuantity: number;
  expiryDate: Date | null;
};

export const productColumns: CustomColumnDef<TypeProduct>[] = [
  {
    accessorKey: "referenceCode",
    header: "Code de reférence",
  },
  {
    accessorKey: "name",
    header: "Nom",
  },

  {
    accessorKey: "type",
    header: "Type de produit",
    // filterOptions: ["CONSOMMABLE", "MATERIEL"],
  },
  {
    accessorKey: "quantityInStock",
    header: "Quantité en stock",
  },
  {
    accessorKey: "minQuantity",
    header: "Seuil d'alerte",
  },
  {
    accessorKey: "expiryDate",
    header: "Date de péremption",
    cell: ({ getValue }) => {
      const rawDate = getValue<Date>();
      return rawDate ? format(new Date(rawDate), "dd/MM/yyyy") : "N/A";
    },
  },
];
