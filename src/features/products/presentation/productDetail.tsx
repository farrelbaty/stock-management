import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  return (
    <div className="p-8">
      <Link
        href="/produits"
        className="flex items-center gap-2 text-blue-500 mb-10 cursor-pointer hover:text-blue-700 hover:scale-105"
      >
        <ArrowLeft size={20} /> Retour aux produits
      </Link>

      <h1 className="text-2xl font-bold my-10">Gants Stériles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informations</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Catégorie:</strong> Consommables
            </li>
            <li>
              <strong>Référence:</strong> MED-4567
            </li>
            <li>
              <strong>Stock disponible:</strong> 320 unités
            </li>
            <li>
              <strong>Stock minimal:</strong> 100 unités
            </li>
            <li>
              <strong>Prix unitaire:</strong> 500 FCFA
            </li>
            <li>
              <strong>Fournisseur:</strong> PharmaX
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Historique des mouvements
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>+50 unités (Réception) — 25 avril 2025</li>
            <li>-10 unités (Sortie bloc opératoire) — 24 avril 2025</li>
            <li>+100 unités (Réception) — 20 avril 2025</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
