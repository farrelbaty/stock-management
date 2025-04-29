/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface PurchaseItem {
  productId: string;
  quantityOrdered: number;
}

export default function NewCommande() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [items, setItems] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    // Simuler une récupération API
    async function fetchData() {
      const suppliersRes = await fetch("/api/suppliers").then((res) =>
        res.json()
      );
      const productsRes = await fetch("/api/products").then((res) =>
        res.json()
      );

      setSuppliers(suppliersRes);
      setProducts(productsRes);
    }

    fetchData();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantityOrdered: 1 }]);
  };

  const handleItemChange = (
    index: number,
    field: keyof PurchaseItem,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value as never;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedSupplier || items.length === 0) {
      alert("Veuillez choisir un fournisseur et au moins un produit.");
      return;
    }

    const newCommande = {
      supplierId: selectedSupplier,
      purchaseItems: items,
    };

    const res = await fetch("/api/commandes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCommande),
    });

    if (res.ok) {
      alert("Commande créée avec succès !");
      // Reset form
      setSelectedSupplier("");
      setItems([]);
    } else {
      alert("Erreur lors de la création de la commande.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Nouvelle Commande</h2>

      <div className="space-y-4">
        {/* Select fournisseur */}
        <Select
          value={selectedSupplier}
          onValueChange={(value: any) => setSelectedSupplier(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un fournisseur" />
          </SelectTrigger>
          <SelectContent>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Liste des produits */}
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <Select
              value={item.productId}
              onValueChange={(value: any) =>
                handleItemChange(index, "productId", value)
              }
            >
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Sélectionnez un produit" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              min={1}
              value={item.quantityOrdered}
              onChange={(e) =>
                handleItemChange(
                  index,
                  "quantityOrdered",
                  Number(e.target.value)
                )
              }
              className="w-24"
            />

            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveItem(index)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button variant="outline" onClick={handleAddItem} className="w-full">
          <Plus className="w-4 h-4 mr-2" /> Ajouter un produit
        </Button>

        <Button onClick={handleSubmit} className="w-full">
          Créer la commande
        </Button>
      </div>
    </div>
  );
}
