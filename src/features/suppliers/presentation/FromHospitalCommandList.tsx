"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { CommandeDetailsModal } from "./CommandeDetailsModal";

const fakeCommandes = [
  {
    id: "CMD001",
    statut: "En attente",
    lignes: [
      { produit: "Gants stériles", quantite: 100 },
      { produit: "Seringues 5ml", quantite: 200 },
    ],
  },
  {
    id: "CMD002",
    statut: "Partiellement livrée",
    lignes: [
      { produit: "Compresses", quantite: 300 },
      { produit: "Désinfectant", quantite: 50 },
    ],
  },
  {
    id: "CMD003",
    statut: "Livrée",
    lignes: [
      { produit: "Blouses médicales", quantite: 75 },
      { produit: "Masques chirurgicaux", quantite: 500 },
    ],
  },
];

export const FromHospitalCommandList = () => {
  const [selectedCommande, setSelectedCommande] = useState(null);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {fakeCommandes.map((commande) => (
        <Card
          key={commande.id}
          className="p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">Commande #{commande.id}</p>
            <p className="text-sm text-muted-foreground">
              Produits : {commande.lignes.length} · Statut : {commande.statut}
            </p>
          </div>
          <Button onClick={() => setSelectedCommande(commande)}>Voir</Button>
        </Card>
      ))}

      {selectedCommande && (
        <CommandeDetailsModal
          commande={selectedCommande}
          onClose={() => setSelectedCommande(null)}
        />
      )}
    </div>
  );
};
