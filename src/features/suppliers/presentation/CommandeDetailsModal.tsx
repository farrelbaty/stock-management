"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export const CommandeDetailsModal = ({ commande, onClose }) => {
  const [produitsDisponibles, setProduitsDisponibles] = useState({});

  useEffect(() => {
    if (commande) {
      const initialState = {};
      commande.lignes.forEach((_, index) => {
        initialState[index] = false;
      });
      setProduitsDisponibles(initialState);
    }
  }, [commande]);

  const toggleProduit = (index) => {
    setProduitsDisponibles((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const tousDisponibles = Object.values(produitsDisponibles).every(Boolean);
  const auMoinsUn = Object.values(produitsDisponibles).some(Boolean);

  const handleValidation = () => {
    if (tousDisponibles) {
      alert("Commande validée entièrement !");
    } else if (auMoinsUn) {
      alert("Commande validée partiellement !");
    } else {
      alert("Aucun produit sélectionné.");
    }
    onClose();
  };

  return (
    <Dialog open={!!commande} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Détails de la commande #{commande.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Statut actuel :</p>
            <p className="font-medium">{commande.statut}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Produits commandés :
            </p>
            <div className="space-y-2">
              {commande.lignes.map((ligne, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`produit-${index}`}
                    checked={produitsDisponibles[index]}
                    onCheckedChange={() => toggleProduit(index)}
                  />
                  <Label
                    htmlFor={`produit-${index}`}
                    className="cursor-pointer"
                  >
                    {ligne.produit} –{" "}
                    <span className="font-semibold">{ligne.quantite}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleValidation} disabled={!auMoinsUn}>
              Valider {tousDisponibles ? "la commande" : "partiellement"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
