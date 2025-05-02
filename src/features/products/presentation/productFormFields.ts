type CommandFieldsType = {
  name: string;
  label: string;
  typeChamps: "text" | "number" | "textarea" | "date" | "select";
  options?: { value: string; label: string }[];
  required: boolean;
};

export const productFormFields: CommandFieldsType[] = [
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
