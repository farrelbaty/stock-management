"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const demandesFictives = [
  {
    id: 1,
    service: "Chirurgie",
    date: "2025-04-20",
    statut: "En attente",
    produits: [
      { nom: "Gants stériles", quantite: 50 },
      { nom: "Séringues 10ml", quantite: 100 },
    ],
  },
  {
    id: 2,
    service: "Médecine Générale",
    date: "2025-04-22",
    statut: "Acceptée",
    produits: [
      { nom: "Bandes de gaze", quantite: 30 },
      { nom: "Désinfectant", quantite: 10 },
    ],
  },
];

export const MesDemandesList1 = () => {
  const [selectedDemande, setSelectedDemande] = useState(null);

  return (
    <div className="space-y-4">
      {demandesFictives.map((demande) => (
        <Card
          key={demande.id}
          className="p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">Demande #{demande.id}</p>
            <p className="text-sm text-muted-foreground">
              Service : {demande.service} · Date : {demande.date}
            </p>
            <p className="text-sm">
              Statut : <span className="font-medium">{demande.statut}</span>
            </p>
          </div>
          <Button onClick={() => setSelectedDemande(demande)}>Détails</Button>
        </Card>
      ))}

      {selectedDemande && (
        <Dialog open onOpenChange={() => setSelectedDemande(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Détails de la demande #{selectedDemande.id}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Service : {selectedDemande.service}
              </p>
              <p className="text-sm text-muted-foreground">
                Date : {selectedDemande.date}
              </p>
              <p className="text-sm text-muted-foreground">
                Statut : {selectedDemande.statut}
              </p>

              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">
                  Produits demandés :
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {selectedDemande.produits.map((prod, idx) => (
                    <li key={idx}>
                      {prod.nom} –{" "}
                      <span className="font-medium">{prod.quantite}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDemande(null)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
