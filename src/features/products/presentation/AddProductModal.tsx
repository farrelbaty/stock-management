/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GenericForm from "@/components/shared/GenericForm";
import ModalComponent from "@/components/shared/ModalComponent";
import { Button } from "@/components/ui/button";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { productFormFields } from "./productFormFields";

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
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast("Produit ajouté avec succès !");
      setOpen(false);
    },
    onError: (error) => {
      toast(error.message);
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
          fields={productFormFields}
          onSubmit={handleSubmit}
          onSuccess={() => setOpen(false)}
        />
      </ModalComponent>
    </>
  );
};

export default AddProductModal;
