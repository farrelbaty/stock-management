/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  name: string;
};

type LigneDestockage = {
  produitId: string | null;
  quantite: number;
};

async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Erreur lors de la récupération des produits");
  return res.json();
}

async function getAllServices(): Promise<Service[]> {
  const res = await fetch("/api/services");
  if (!res.ok) throw new Error("Erreur lors de la récupération des services");
  return res.json();
}

export default function DestockProducts() {
  const [lignes, setLignes] = useState<LigneDestockage[]>([
    { produitId: null, quantite: 1 },
  ]);
  const [serviceId, setServiceId] = useState<string>("");

  const { data: produits } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

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
    setLignes([...lignes, { produitId: null, quantite: 1 }]);
  };

  const supprimerLigne = (index: number) => {
    setLignes(lignes.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    try {
      if (!serviceId) {
        alert("Veuillez sélectionner un service.");
        return;
      }

      const lignesValides = lignes.filter((l) => l.produitId !== null);

      const res = await fetch("/api/destockage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          produits: lignesValides,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors du déstockage");

      alert("Déstockage effectué avec succès !");
      setLignes([{ produitId: null, quantite: 1 }]);
      setServiceId("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Déstockage de produits
      </h2>

      <div className="flex flex-col">
        <Label className="mb-1">Service de destination</Label>
        <select
          className="border p-2 rounded"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">-- Choisir un service --</option>
          {services?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
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
            >
              <option value="">-- Sélectionner un produit --</option>
              {produits?.map((p) => (
                <option key={p.id} value={p.id}>
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
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
        >
          Valider le déstockage
        </button>
      </div>
    </div>
  );
}
