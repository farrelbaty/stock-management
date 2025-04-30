/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalComponent from "@/components/ModalComponent";
import GenericForm from "@/components/GenericForm";

const fournisseurFields = [
  { name: "name", label: "Nom", type: "text", required: true },
  { name: "email", label: "Email", type: "text", required: true },
  { name: "address", label: "Adresse", type: "text", required: true },
  { name: "phoneNumber", label: "Téléphone", type: "text", required: true },
];

export function AddSupplierClient() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (formData: Record<string, any>) => {
    console.log("Nouveau fournisseur soumis :", formData);
    setOpen(false);
  };

  return (
    <>
      <Button
        className="flex items-center gap-2 cursor-pointer font-bold px-4 py-2"
        onClick={() => setOpen(true)}
      >
        <Plus size={20} /> Nouveau fournisseur
      </Button>

      <ModalComponent
        open={open}
        onOpenChange={setOpen}
        title="Ajouter un fournisseur"
        description="Remplissez les informations du fournisseur"
      >
        <GenericForm
          fields={fournisseurFields}
          onSubmit={handleSubmit}
          onSuccess={() => setOpen(false)}
        />
      </ModalComponent>
    </>
  );
}
