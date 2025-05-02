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

export function generateReferenceCode(): string {
  const prefix = "CDL";
  const year = new Date().getFullYear();
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPart += characters[randomIndex];
  }

  return `${prefix}-${year}-${randomPart}`;
}

export async function getAllProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw error;
  }
}
