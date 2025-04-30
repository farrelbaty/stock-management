import { TableComponent } from "@/components/TabelComponent";
import AddProductModal from "@/features/products/presentation/AddProductModal";
import { ProductType } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  filterOptions?: string[];
};

type TypeProduct = {
  referenceCode: string;
  name: string;
  type: ProductType;
  quantityInStock: number;
  minQuantity: number;
};
const produits: TypeProduct[] = [
  {
    referenceCode: "CDL-2025-gl",
    name: "Gants",
    type: "CONSOMMABLE",
    quantityInStock: 30,
    minQuantity: 20,
  },

  {
    referenceCode: "CDL-2025-005",
    name: "Tubes",
    type: "MATERIEL",
    quantityInStock: 80,
    minQuantity: 50,
  },
  {
    referenceCode: "CDL-2025-001",
    name: "Seringues",
    type: "MATERIEL",
    quantityInStock: 10,
    minQuantity: 50,
  },
];

const columns: CustomColumnDef<TypeProduct>[] = [
  {
    accessorKey: "referenceCode",
    header: "Reférence",
  },
  {
    accessorKey: "name",
    header: "Nom",
  },

  {
    accessorKey: "type",
    header: "Type de produit",
    filterOptions: ["CONSOMMABLE", "MATERIEL"],
  },
  {
    accessorKey: "quantityInStock",
    header: "Quantité en stock",
  },
  {
    accessorKey: "minQuantity",
    header: "Quantité minimale",
  },
];
const ProductPage = () => {
  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Link
          href="/fournisseurs/newsupplier"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded cursor-pointer font-bold"
        >
          <Plus size={20} /> Nouveau produit
        </Link>
      </div>
      <TableComponent columns={columns} data={produits} />
      <AddProductModal />
    </div>
  );
};

export default ProductPage;
