import { TableComponent } from "@/components/shared/TabelComponent";
import AddProductModal from "@/features/products/presentation/AddProductModal";
import { ProductType } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

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
  expiryDate: Date | "N/A";
};
const produits: TypeProduct[] = [
  {
    referenceCode: "CDL-2025-gl",
    name: "Gants",
    type: "CONSOMMABLE",
    quantityInStock: 30,
    minQuantity: 20,
    expiryDate: "N/A",
  },

  {
    referenceCode: "CDL-2025-005",
    name: "Tubes",
    type: "MATERIEL",
    quantityInStock: 80,
    minQuantity: 50,
    expiryDate: "N/A",
  },
  {
    referenceCode: "CDL-2025-001",
    name: "Seringues",
    type: "MATERIEL",
    quantityInStock: 10,
    minQuantity: 50,
    expiryDate: "N/A",
  },
];

const columns: CustomColumnDef<TypeProduct>[] = [
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
  },
];
const ProductPage = () => {
  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Produits</h1>
        <AddProductModal />
      </div>
      <TableComponent columns={columns} data={produits} />
    </div>
  );
};

export default ProductPage;
