import { TableComponent } from "@/components/TabelComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};

const data: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@email.com",
    address: "Libreville, Gabon",
    phoneNumber: "077307529",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@email.com",
    address: "Paris, France",
    phoneNumber: "+33 12345678",
  },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Adresse",
  },
  {
    accessorKey: "phoneNumber",
    header: "Téléphone",
  },
];
const SuppliersPage = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between mb-20">
          <h1 className="text-2xl font-bold">Fournisseurs</h1>
          <Link
            href="/fournisseurs/newsupplier"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded cursor-pointer font-bold"
          >
            <Plus size={20} /> Nouveau fournisseur
          </Link>
        </div>
      </div>
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default SuppliersPage;
