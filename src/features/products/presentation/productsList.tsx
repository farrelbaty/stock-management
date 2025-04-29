import { CheckCircle, Edit, Eye, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsList() {
  const commandes = [
    {
      id: 1,
      referenceCode: "CDL-2025-gl",
      name: "Gants",
      type: "CONSOMMABLE",
      quantityInStock: 30,
      minQuantity: 20,
    },

    {
      id: 2,
      referenceCode: "CDL-2025-005",
      name: "Tubes",
      type: "MEDICAL",
      quantityInStock: 80,
      minQuantity: 50,
    },
    {
      id: 3,
      referenceCode: "CDL-2025-001",
      name: "Seringues",
      type: "MEDICAL",
      quantityInStock: 10,
      minQuantity: 50,
    },
  ];

  return (
    <div className="p-8 bg-white shadow-lg">
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-bold">Commandes</h1>
        <Link
          href="/commandes/neworder"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded cursor-pointer"
        >
          <Plus size={20} /> Nouveau produit
        </Link>
      </div>

      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-6 text-left">Référence</th>
            <th className="py-2 px-6 text-left">Nom</th>
            <th className="py-2 px-6 text-left">Type de produit</th>
            <th className="py-2 px-6 text-left">Quantité en stock</th>
            <th className="py-2 px-6 text-left">Quantité minimale</th>
            <th className="py-2 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((cmd) => {
            const variation = cmd.quantityInStock - cmd.minQuantity;
            return (
              <tr
                key={cmd.id}
                className={`border-b ${
                  variation < 0 ? "bg-red-700" : "bg-green-500"
                }`}
              >
                <td className="py-2 px-6">{cmd.referenceCode}</td>
                <td className="py-2 px-6">{cmd.name}</td>
                <td className="py-2 px-6">{cmd.type}</td>
                <td className="py-2 px-6">{cmd.quantityInStock}</td>
                <td className="py-2 px-6">{cmd.minQuantity}</td>

                <td className="py-2 px-4 flex justify-center gap-2">
                  <Link href={`/produits/${cmd.id}`} className="cursor-pointer">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </Link>
                  <button className="cursor-pointer">
                    <Edit className="w-5 h-5 text-black" />
                  </button>
                  <button className="cursor-pointer">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
