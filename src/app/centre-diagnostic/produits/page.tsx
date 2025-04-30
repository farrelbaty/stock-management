import { TableComponent } from "@/components/shared/TabelComponent";
import AddProductModal from "@/features/products/presentation/AddProductModal";
import { productColumns } from "@/features/products/presentation/productColumns";
import { getAllProductsUseCase } from "@/lib/usecases/productUseCase";
import { ColumnDef } from "@tanstack/react-table";

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  filterOptions?: string[];
};

const ProductPage = async () => {
  const products = await getAllProductsUseCase.execute();
  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Produits</h1>
        <AddProductModal />
      </div>
      <TableComponent columns={productColumns} data={products} />
    </div>
  );
};

export default ProductPage;
