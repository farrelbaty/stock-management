/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GenericForm from "@/components/shared/GenericForm";
import ModalComponent from "@/components/shared/ModalComponent";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CommandFieldsType = {
  name: string;
  label: string;
  typeChamps: "text" | "number" | "textarea" | "date" | "select";
  options?: { value: string; label: string }[];
  required: boolean;
};

const commandFields: CommandFieldsType[] = [
  { name: "name", label: "Nom", typeChamps: "text", required: true },
  {
    name: "type",
    label: "Type de produit",
    typeChamps: "select",
    options: [
      {
        label: "Consommable",
        value: "CONSOMMABLE",
      },
      {
        label: "Matériel",
        value: "MATERIEL",
      },
      {
        label: "Médicament",
        value: "MEDICAMENT",
      },
      {
        label: "Autre",
        value: "AUTRE",
      },
    ],
    required: false,
  },
  {
    name: "quantityInStock",
    label: "Quantité en stock",
    typeChamps: "number",
    required: true,
  },
  {
    name: "minQuantity",
    label: "Seuil d'alerte",
    typeChamps: "number",
    required: true,
  },
  {
    name: "expiryDate",
    label: "Date de péremption",
    typeChamps: "date",
    required: false,
  },
];

const AddProductModal = () => {
  const [open, setOpen] = useState(false);

  const addProduct = async (data: Record<string, any>) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Échec de l'ajout du produit");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast("Produit ajouté avec succès !");
      setOpen(false);
    },
    onError: (error) => {
      toast("Erreur lors de l'ajout du produit");
      console.error(error);
    },
  });

  const handleSubmit = (formData: Record<string, any>) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <Button
        className="flex items-center gap-2 cursor-pointer hover:scale-105 font-bold px-4 py-2"
        onClick={() => setOpen(true)}
      >
        <Plus size={20} /> Nouveau produit
      </Button>
      <ModalComponent
        open={open}
        onOpenChange={setOpen}
        title="Ajouter un produit"
      >
        <GenericForm
          fields={commandFields}
          onSubmit={handleSubmit}
          onSuccess={() => setOpen(false)}
        />
      </ModalComponent>
    </>
  );
};

export default AddProductModal;
