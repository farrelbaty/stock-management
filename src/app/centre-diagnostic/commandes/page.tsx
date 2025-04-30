import { TableComponent } from "@/components/TabelComponent";
import { Order } from "@/features/orders/domain/entity/Order";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<Order>[] = [
  { accessorKey: "reference", header: "Reférence" },
  { accessorKey: "supplier", header: "Fournisseur" },
  { accessorKey: "orderDate", header: "Date d'émission" },
  { accessorKey: "status", header: "Statut" },
  { accessorKey: "deliveryDate", header: "Date de réception" },
];

const commandFields = [
  {
    name: "reference",
    label: "Référence",
    type: "text",
    required: true,
  },
  {
    name: "supplierId",
    label: "Fournisseur",
    type: "select",
    required: true,
    options: [
      { label: "Fournisseur 1", value: "Fournisseur1" },
      { label: "Fournisseur 2", value: "Fournisseur2" },
    ],
  },
  {
    name: "orderDate",
    label: "Date de commande",
    type: "date",
    required: true,
  },
  {
    name: "deliveryDate",
    label: "Date de livraison",
    type: "date",
    required: false,
  },
  {
    name: "status",
    label: "Statut",
    type: "select",
    required: true,
    options: [
      { label: "En attente", value: "EN ATTENTE" },
      { label: "Reçue", value: "RECUE" },
    ],
  },
];

const OrdersPage = () => {
  const commandes: Order[] = [
    {
      id: "1",
      supplierId: "Fournisseur1",
      orderDate: new Date("2025-26-04"),
      status: "EN ATTENTE",
      deliveryDate: new Date("01-05-2025"),
    },
    {
      id: "2",
      supplierId: "Fournisseur2",
      orderDate: new Date("2025-04-26"),
      status: "RECUE",
      deliveryDate: new Date("2025-01-05"),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Commandes</h1>
        <Link
          href="/commandes/neworder"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded cursor-pointer font-bold"
        >
          <Plus size={20} /> Nouvelle commande
        </Link>
      </div>
      <TableComponent columns={columns} data={commandes} />
    </div>
  );
};

export default OrdersPage;
