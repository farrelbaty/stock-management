import { TableComponent } from "@/components/shared/TabelComponent";
import { Order } from "@/features/orders/domain/entity/Order";
import { commandeColumns } from "@/features/orders/presentation/commandeColumns";
import { Plus } from "lucide-react";
import Link from "next/link";

const OrdersPage = () => {
  const commandes: Order[] = [];

  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Commandes</h1>
        <Link
          href="/centre-diagnostic/commandes/neworder"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded cursor-pointer font-bold"
        >
          <Plus size={20} /> Nouvelle commande
        </Link>
      </div>
      <TableComponent columns={commandeColumns} data={commandes} />
    </div>
  );
};

export default OrdersPage;
