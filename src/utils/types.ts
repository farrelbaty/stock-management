export type ProductType = "MEDICAMENT" | "MATERIEL" | "CONSOMMABLE" | "AUTRE";

export type MovementType = "ENTREE" | "SORTIE";

export type OrderStatus =
  | "PENDING"
  | "PARTIALLY_RECEIVED"
  | "RECEIVED"
  | "CANCELLED";

export type UserRole = "ADMIN" | "GESTIONNAIRE" | "UTILISATEUR";
