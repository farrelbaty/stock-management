/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GenericForm from "@/components/GenericForm";
import ModalComponent from "@/components/ModalComponent";
import { useState } from "react";

const AddProductModal = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (formData: Record<string, any>) => {
    console.log("Nouveau fournisseur soumis :", formData);
  };

  const commandFields = [];
  return (
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
  );
};

export default AddProductModal;
