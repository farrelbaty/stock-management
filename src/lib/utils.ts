import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ProductType = "MEDICAMENT" | "MATERIEL" | "CONSOMMABLE" | "AUTRE";

export type MovementType = "ENTREE" | "SORTIE";

export type OrderStatus =
  | "PENDING"
  | "PARTIALLY_RECEIVED"
  | "RECEIVED"
  | "CANCELLED";

export type UserRole = "ADMIN" | "GESTIONNAIRE" | "UTILISATEUR";
