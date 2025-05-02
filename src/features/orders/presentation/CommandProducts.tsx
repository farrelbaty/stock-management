/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Product } from "@/features/products/domain/entity/Product";
import { getAllSuppliers } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Fournisseur = {
  id: string;
  name: string;
  produits: Product[];
};

type LigneCommande = {
  produitId: string | null;
  quantityOrdered: number;
  prix: number;
};

export default function CommandProducts() {
  const [selectedFournisseurId, setSelectedFournisseurId] = useState<
    string | null
  >(null);
  const [lignes, setLignes] = useState<LigneCommande[]>([
    { produitId: null, quantityOrdered: 1, prix: 0 },
  ]);

  const { data: fournisseurs } = useQuery<Fournisseur[]>({
    queryKey: ["suppliers"],
    queryFn: getAllSuppliers,
  });

  const selectedFournisseur = fournisseurs?.find(
    (f) => f.id === selectedFournisseurId
  );
  const produitsDuFournisseur = selectedFournisseur?.produits ?? [];

  const getPrixProduitChezFournisseur = (produitId: string) => {
    const produit = produitsDuFournisseur.find((p) => p.id === produitId);
    const fournisseurInfo = produit?.fournisseurs?.find(
      (f) => f.id === selectedFournisseurId
    );
    return fournisseurInfo?.prix ?? 0;
  };

  const handleChange = (
    index: number,
    field: "produitId" | "quantite",
    value: any
  ) => {
    const newLignes = [...lignes];
    if (field === "quantite") {
      newLignes[index].quantityOrdered = parseInt(value, 10);
    } else {
      newLignes[index].produitId = value;
    }

    const produitId = newLignes[index].produitId;
    if (produitId && selectedFournisseurId) {
      const prixUnitaire = getPrixProduitChezFournisseur(produitId);
      newLignes[index].prix = prixUnitaire * newLignes[index].quantityOrdered;
    }

    setLignes(newLignes);
  };

  const handleFournisseurChange = (id: string) => {
    setSelectedFournisseurId(id);
    setLignes((prev) =>
      prev.map((ligne) => {
        if (!ligne.produitId) return ligne;
        const prixUnitaire = getPrixProduitChezFournisseur(ligne.produitId);
        return {
          ...ligne,
          prix: prixUnitaire * ligne.quantityOrdered,
        };
      })
    );
  };

  const ajouterLigne = () => {
    setLignes([...lignes, { produitId: null, quantityOrdered: 1, prix: 0 }]);
  };

  const supprimerLigne = (index: number) => {
    setLignes(lignes.filter((_, i) => i !== index));
  };

  const sendCommand = async () => {
    try {
      const commande = lignes
        .filter((l) => l.produitId !== null)
        .map(({ produitId, quantityOrdered }) => ({
          produitId,
          quantityOrdered,
        }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fournisseurId: selectedFournisseurId,
          lignes: commande,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi de la commande");

      toast("Commande envoyée avec succès !");
      setLignes([{ produitId: null, quantityOrdered: 1, prix: 0 }]);
      setSelectedFournisseurId(null);
    } catch (err) {
      console.error(err);
      toast("Échec de l'envoi de la commande.");
    }
  };

  return (
    // UI inchangée
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center">Nouvelle commande</h2>

      <div className="flex flex-col">
        <Label className="mb-1">Fournisseur</Label>
        <select
          className="border p-2 rounded w-full"
          value={selectedFournisseurId ?? ""}
          onChange={(e) => handleFournisseurChange(e.target.value)}
        >
          <option value="">-- Sélectionner un fournisseur --</option>
          {fournisseurs?.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

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
              disabled={!selectedFournisseurId}
            >
              <option value="">-- Sélectionner un produit --</option>
              {produitsDuFournisseur.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-28">
            <Label className="mb-1">Quantité</Label>
            <input
              type="number"
              min={1}
              className="border p-2 rounded"
              value={ligne.quantityOrdered}
              onChange={(e) => handleChange(index, "quantite", e.target.value)}
              disabled={!ligne.produitId}
            />
          </div>

          <div className="flex flex-col w-32">
            <Label className="mb-1">Prix</Label>
            <input
              type="text"
              className="border p-2 rounded bg-gray-100"
              readOnly
              value={ligne.prix.toFixed(2) + " FCFA"}
            />
          </div>

          <button
            onClick={() => supprimerLigne(index)}
            className="text-red-500 hover:text-red-700"
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
          disabled={!selectedFournisseurId}
        >
          + Ajouter un produit
        </button>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
          onClick={sendCommand}
          disabled={!selectedFournisseurId || lignes.length === 0}
        >
          Valider la commande
        </button>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium">Résumé</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {lignes
            .filter((l) => l.produitId)
            .map((l, i) => {
              const produit = produitsDuFournisseur.find(
                (p) => p.id === l.produitId
              );
              return (
                <li key={i}>
                  {produit?.name} — <strong>{l.quantityOrdered}</strong> —{" "}
                  {l.prix.toFixed(2)} FCFA
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
