import { CheckCircle, Edit, Eye, Plus } from "lucide-react";
import Link from "next/link";

export default function OrderList() {
  const commandes = [
    {
      id: 1,
      reference: "CMD-2025-001",
      fournisseur: "Fournisseur1",
      date: "26-04-2025",
      statut: "EN ATTENTE",
    },
    {
      id: 2,
      reference: "CMD-2025-002",
      fournisseur: "Fournisseur2",
      date: "26-04-2025",
      statut: "RECUE",
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
          <Plus size={20} /> Nouvelle commande
        </Link>
      </div>

      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Référence</th>
            <th className="py-2 px-4 text-left">Fournisseur</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Statut</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((cmd) => (
            <tr key={cmd.id} className="border-b">
              <td className="py-2 px-4">{cmd.reference}</td>
              <td className="py-2 px-4">{cmd.fournisseur}</td>
              <td className="py-2 px-4">{cmd.date}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    cmd.statut === "RECUE" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {cmd.statut}
                </span>
              </td>
              <td className="py-2 px-4 flex justify-center gap-2">
                <button className="cursor-pointer">
                  <Eye className="w-5 h-5 text-blue-500" />
                </button>
                <button className="cursor-pointer">
                  <Edit className="w-5 h-5 text-gray-500" />
                </button>
                <button className="cursor-pointer">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
