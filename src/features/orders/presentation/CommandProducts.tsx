/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@radix-ui/react-label";
import { Trash2 } from "lucide-react"; // icône de poubelle (facultatif)
import { useState } from "react";

type Produit = {
  id: number;
  nom: string;
};

type LigneCommande = {
  produitId: number | null;
  quantite: number;
};

const produitsDispo: Produit[] = [
  { id: 1, nom: "Gants stériles" },
  { id: 2, nom: "Seringues 5ml" },
  { id: 3, nom: "Masques chirurgicaux" },
  { id: 4, nom: "Désinfectant" },
];

export default function CommandProducts() {
  const [lignes, setLignes] = useState<LigneCommande[]>([
    { produitId: null, quantite: 1 },
  ]);

  const handleChange = (
    index: number,
    field: "produitId" | "quantite",
    value: any
  ) => {
    const newLignes = [...lignes];
    newLignes[index] = {
      ...newLignes[index],
      [field]: field === "quantite" ? parseInt(value, 10) : parseInt(value),
    };
    setLignes(newLignes);
  };

  const ajouterLigne = () => {
    setLignes([...lignes, { produitId: null, quantite: 1 }]);
  };

  const supprimerLigne = (index: number) => {
    const newLignes = lignes.filter((_, i) => i !== index);
    setLignes(newLignes);
  };

  const produitsSelectionnes = lignes
    .filter((l) => l.produitId !== null)
    .map((l) => ({
      produit: produitsDispo.find((p) => p.id === l.produitId)?.nom,
      quantite: l.quantite,
    }));

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center">Nouvelle commande</h2>

      {lignes.map((ligne, index) => (
        <div
          key={index}
          className="flex items-end gap-4 bg-white p-4 rounded-md shadow-sm"
        >
          <div className="flex flex-col w-full">
            <Label className="mb-1">Produit</Label>
            <select
              className="border p-2 rounded w-full"
              value={ligne.produitId ?? ""}
              onChange={(e) => handleChange(index, "produitId", e.target.value)}
            >
              <option value="">-- Sélectionner un produit --</option>
              {produitsDispo.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-32">
            <Label className="mb-1">Quantité</Label>
            <input
              type="number"
              min={1}
              className="border p-2 rounded w-full"
              value={ligne.quantite}
              onChange={(e) => handleChange(index, "quantite", e.target.value)}
            />
          </div>

          <button
            onClick={() => supprimerLigne(index)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
            title="Supprimer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      <div className="flex justify-center gap-6">
        <button
          onClick={ajouterLigne}
          className="px-6 py-2 bg-blue-300 text-white rounded hover:bg-blue-500 font-bold"
        >
          + Ajouter un produit
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">
          Valider la commande
        </button>
      </div>

      {produitsSelectionnes.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium">Résumé de la commande</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {produitsSelectionnes.map((item, i) => (
              <li key={i}>
                {item.produit} — <strong>{item.quantite}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
