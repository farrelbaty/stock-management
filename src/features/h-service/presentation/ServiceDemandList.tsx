"use client";

import { useQuery } from "@tanstack/react-query";
import serviceService from "@/services/serviceService";
import { Card } from "@/components/ui/card";

export const ServiceDemandList = () => {
  const { data: demandes, isLoading } = useQuery({
    queryKey: ["mesDemandes"],
    queryFn: serviceService.getDemandes,
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="grid gap-3">
      {demandes?.map((demande) => (
        <Card key={demande.id} className="p-4">
          <div className="flex justify-between">
            <span>
              Produit: {demande.produit.nom} · Quantité: {demande.quantite}
            </span>
            <span className="text-sm text-muted-foreground">
              Statut: {demande.statut}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
