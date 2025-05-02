"use client";

import { TableComponent } from "@/components/shared/TabelComponent";
import { Product } from "@/features/products/domain/entity/Product";
import AddProductModal from "@/features/products/presentation/AddProductModal";
import { productColumns } from "@/features/products/presentation/productColumns";
import { getAllProducts } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  filterOptions?: string[];
};

const ProductPage = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Produits</h1>
        <AddProductModal />
      </div>
      <TableComponent columns={productColumns} data={products ?? []} />
    </div>
  );
};

export default ProductPage;
