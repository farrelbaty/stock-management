/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Product } from "@/features/products/domain/entity/Product";
import { getAllProducts } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type LigneCommande = {
  produitId: string | null;
  quantityOrdered: number;
};

export default function CommandProducts() {
  const [lignes, setLignes] = useState<LigneCommande[]>([
    { produitId: null, quantityOrdered: 1 },
  ]);

  const handleChange = (
    index: number,
    field: "produitId" | "quantite",
    value: any
  ) => {
    const newLignes = [...lignes];
    newLignes[index] = {
      ...newLignes[index],
      [field]: field === "quantite" ? parseInt(value, 10) : value,
    };
    setLignes(newLignes);
  };

  const ajouterLigne = () => {
    setLignes([...lignes, { produitId: null, quantityOrdered: 1 }]);
  };

  const supprimerLigne = (index: number) => {
    const newLignes = lignes.filter((_, i) => i !== index);
    setLignes(newLignes);
  };

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const produitsSelectionnes = lignes
    .filter((l) => l.produitId !== null)
    .map((l) => ({
      produit: data?.find((p) => p.id === l.produitId)?.name,
      quantite: l.quantityOrdered,
    }));

  const sendCommand = async () => {
    try {
      const commande = lignes.filter((l) => l.produitId !== null);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lignes: commande }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi de la commande");

      const data = await res.json();
      toast("Commande envoyée avec succès !");
      return data;
      setLignes([{ produitId: null, quantityOrdered: 1 }]);
    } catch (err) {
      console.error(err);
      toast("Échec de l'envoi de la commande.");
    }
  };

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
              {isLoading && <p>chargement...</p>}
              {data?.map((p) => (
                <option key={p.id} value={p.id as string}>
                  {p.name}
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
              value={ligne.quantityOrdered}
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
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
          onClick={sendCommand}
        >
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
