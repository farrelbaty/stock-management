"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface AddMovementModalProps {
  open: boolean;
  onClose: () => void;
}

type Product = {
  id: string;
  name: string;
};

export function AddMovementModal({ open, onClose }: AddMovementModalProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [type, setType] = useState<"ENTREE" | "SORTIE">("ENTREE");
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");

  useEffect(() => {
    // Remplace ceci par ton appel réel à une API ou Prisma
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }

    if (open) fetchProducts();
  }, [open]);

  const handleSubmit = async () => {
    const payload = {
      productId,
      type,
      quantity,
      reason,
    };

    // Appel API POST vers ton endpoint
    await fetch("/api/stock-movements", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un mouvement</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Select onValueChange={setProductId}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un produit" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setType(value as "ENTREE" | "SORTIE")}
            defaultValue="ENTREE"
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de mouvement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ENTREE">Entrée</SelectItem>
              <SelectItem value="SORTIE">Sortie</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Quantité"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <Textarea
            placeholder="Raison (optionnelle)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
