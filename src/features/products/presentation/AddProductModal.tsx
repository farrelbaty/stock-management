/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GenericForm from "@/components/shared/GenericForm";
import ModalComponent from "@/components/shared/ModalComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

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

  const handleSubmit = (formData: Record<string, any>) => {
    console.log("Nouveau fournisseur soumis :", formData);
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
        title="Ajouter une commande"
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
