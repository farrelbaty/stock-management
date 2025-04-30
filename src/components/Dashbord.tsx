import { Boxes, PackageCheck, Repeat } from "lucide-react";
import { KpiCard } from "./shared/KPIComponent";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Produits en stock"
          value="150"
          icon={<Boxes className="w-8 h-8 text-primary" />}
        />
        <KpiCard
          title="Produits en rupture"
          value="5"
          icon={<Boxes className="w-8 h-8 text-red-500" />}
        />
        <KpiCard
          title="Produits en périmés"
          value="2"
          icon={<Boxes className="w-8 h-8 text-red-800" />}
        />
        <KpiCard
          title="Produits en proches de la péremption"
          value="8"
          icon={<Boxes className="w-8 h-8 text-red-500" />}
        />
        <KpiCard
          title="Commandes en attente"
          value="3"
          icon={<PackageCheck className="w-8 h-8 text-yellow-500" />}
        />
        <KpiCard
          title="Mouvements (7j)"
          value="45"
          icon={<Repeat className="w-8 h-8 text-green-500" />}
        />
      </div>
      <div className="shadow-lg bg-white p-8">
        <h2 className="text-xl font-semibold mb-8 ">Produits critiques</h2>
        <table className="min-w-full  rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left ">Produit</th>
              <th className="py-2 px-4 text-left ">Stock actuel</th>
              <th className="py-2 px-4 text-left ">Stock minimum</th>
              <th className="py-2 px-4 text-left ">Date de péremption</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 ">Gants latex</td>
              <td className="py-2 px-4 ">5</td>
              <td className="py-2 px-4 ">20</td>
              <td className="py-2 px-4 ">N/A</td>
            </tr>
            <tr>
              <td className="py-2 px-4 ">Masques chirurgicaux</td>
              <td className="py-2 px-4 ">12</td>
              <td className="py-2 px-4 ">30</td>
              <td className="py-2 px-4 ">N/A</td>
            </tr>
            <tr>
              <td className="py-2 px-4 ">Paracétamol</td>
              <td className="py-2 px-4 ">70</td>
              <td className="py-2 px-4 ">30</td>
              <td className="py-2 px-4 ">30/04/2025</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mouvements récents */}
      <div className="bg-white shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-8 ">Derniers mouvements</h2>
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left ">Produit</th>
              <th className="py-2 px-4 text-left ">Type</th>
              <th className="py-2 px-4 text-left ">Quantité</th>
              <th className="py-2 px-4 text-left ">Date</th>
              <th className="py-2 px-4 text-left ">Motif</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 ">Paracétamol</td>
              <td className="py-2 px-4 ">Entrée</td>
              <td className="py-2 px-4 ">200</td>
              <td className="py-2 px-4 ">26/04/2025</td>
              <td className="py-2 px-4 ">Réception commande #234</td>
            </tr>
            <tr>
              <td className="py-2 px-4 ">Gants latex</td>
              <td className="py-2 px-4 ">Sortie</td>
              <td className="py-2 px-4 ">15</td>
              <td className="py-2 px-4 ">26/04/2025</td>
              <td className="py-2 px-4 ">Consommation bloc opératoire</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
