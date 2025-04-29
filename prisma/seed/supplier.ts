import { db } from "@/lib/db";

async function main() {
  const suppliers = [
    {
      name: "Fournisseur 1",
      address: "Paris, France",
      phoneNumber: "+33 1234567",
      email: "fournisseur1@gmail.com",
    },
    {
      name: "Fournisseur 2",
      address: "Libreville, Gabon",
      phoneNumber: "+241 771234567",
      email: "fournisseur2@gmail.com",
    },
  ];

  await db.supplier.createMany({
    data: suppliers,
  });
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.log(e);
    db.$disconnect();
    process.exit(1);
  });
