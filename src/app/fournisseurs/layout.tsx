import { Button } from "@/components/ui/button";
import { Boxes, LayoutDashboard, LogOut, PackageCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = {
  title: "CDL fournisseur",
  description: "Gestion de stocks de la clinique Centre-diagnostic",
};

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: <LayoutDashboard />,
      href: "/fournisseurs",
    },

    {
      id: "purchase",
      label: "Commandes",
      icon: <PackageCheck />,
      href: "/fournisseurs/commandes",
    },
    {
      id: "products",
      label: "Produits",
      icon: <Boxes />,
      href: "/fournisseurs/produits",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl px-4 py-10">
        <div className="text-2xl font-bold mb-8">Fournisseur</div>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-blue-50 `}
            >
              {item.icon} <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-10">
          <Button
            variant="outline"
            className="w-full flex gap-2 justify-center"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </Button>
        </div>
      </aside>
      <main className="flex-1 px-6 py-10 h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
}
