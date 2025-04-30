import { TableComponent } from "@/components/shared/TabelComponent";
import { AddSupplierClient } from "@/features/suppliers/presentation/AddSupplierModal";
import { ColumnDef } from "@tanstack/react-table";

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
  {
    id: 3,
    name: "Ben",
    email: "ben@email.com",
    address: "Paris, France",
    phoneNumber: "+33 12345678",
  },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nom" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "address", header: "Adresse" },
  { accessorKey: "phoneNumber", header: "Téléphone" },
];

const SuppliersPage = () => {
  return (
    <div>
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Fournisseurs</h1>
        <AddSupplierClient />
      </div>

      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default SuppliersPage;
