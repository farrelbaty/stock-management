"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { useRouter } from "next/navigation";

export default function NewStockMovement() {
  const { register, handleSubmit, reset, setValue } = useForm();
  // const router = useRouter();

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold">Nouveau Mouvement 📥📤</h2>

      <Select onValueChange={(value) => setValue("productId", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un produit" />
        </SelectTrigger>
        <SelectContent>
          {/* TODO: Mapper tous les produits ici */}
          <SelectItem value="product1">Paracétamol 500mg</SelectItem>
          <SelectItem value="product2">Gants stériles</SelectItem>
        </SelectContent>
      </Select>

      <Select {...register("type")}>
        <SelectTrigger>
          <SelectValue placeholder="Type de mouvement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ENTREE">Entrée</SelectItem>
          <SelectItem value="SORTIE">Sortie</SelectItem>
        </SelectContent>
      </Select>

      <Input
        {...register("quantity", { required: true })}
        placeholder="Quantité"
        type="number"
      />

      <Input {...register("reason")} placeholder="Raison (optionnel)" />

      <Button type="submit" className="w-full">
        Enregistrer le mouvement
      </Button>
    </form>
  );
}
