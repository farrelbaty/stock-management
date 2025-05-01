import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const fakeDemandes = [
  {
    id: "DEM001",
    produit: "Gants stériles",
    quantite: 100,
    statut: "En attente",
    date: "2025-04-28",
  },
  {
    id: "DEM002",
    produit: "Seringues 5ml",
    quantite: 200,
    statut: "Validée",
    date: "2025-04-27",
  },
  {
    id: "DEM003",
    produit: "Compresses",
    quantite: 150,
    statut: "Partiellement livrée",
    date: "2025-04-26",
  },
  {
    id: "DEM004",
    produit: "Désinfectant",
    quantite: 50,
    statut: "Rejetée",
    date: "2025-04-25",
  },
];

type OrderDemands = {
  id: string;
  supplierId: string | null;
  orderDate: Date;
  status: "PENDING" | "PARTIALLY_RECEIVED" | "RECEIVED" | "CANCELLED";
  deliveryDate: Date | null;
  totalAmount: number | null;
};

type DemandProps = {
  demands: OrderDemands[];
  serviceId: string;
};

export const MesDemandesList = ({ demands, serviceId }: DemandProps) => {
  console.log(demands, serviceId);
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {fakeDemandes.map((demande) => (
        <Card key={demande.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{demande.produit}</p>
              <p className="text-sm text-muted-foreground">
                Quantité : {demande.quantite} · Date : {demande.date}
              </p>
            </div>
            <Badge variant="outline">{demande.statut}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};
