import { db } from "@/lib/db";
import { registerUserUseCase } from "@/lib/usecases/usersUseCase";

async function seedUsers() {
  // Vérifie que les rôles existent
  const roles = await db.role.findMany({
    select: { id: true, name: true },
    where: {
      name: {
        in: ["MEDECIN", "ADMIN", "GESTIONNAIRE", "FOURNISSEUR"],
      },
    },
  });

  if (roles.length === 0) {
    throw new Error("Aucun rôle trouvé dans la base de données.");
  }

  // Crée un dictionnaire : { "MEDECIN": "id123", ... }
  const roleMap = roles.reduce((acc, role) => {
    acc[role.name] = role.id;
    return acc;
  }, {} as Record<string, string>);

  console.log("Rôles disponibles :", roleMap);

  // Définition des utilisateurs à créer
  const users = [
    {
      name: "YEKINI CARINE",
      email: "dryekinicarine@gmail.com",
      password: "111111111",
      role: "MEDECIN",
    },
    {
      name: "Angelle",
      email: "angelle@gmail.com",
      password: "111111111",
      role: "GESTIONNAIRE",
    },
  ];

  for (const user of users) {
    const roleId = roleMap[user.role];
    if (!roleId) {
      console.warn(`❌ Role non trouvé pour ${user.role}, utilisateur ignoré.`);
      continue;
    }

    try {
      await registerUserUseCase.execute(
        user.name,
        user.email,
        roleId,
        user.password
      );
      console.log(`✅ Utilisateur ${user.email} créé avec succès.`);
    } catch (err) {
      console.error(`❌ Échec création de ${user.email} :`, err);
    }
  }
}

seedUsers()
  .catch((e) => {
    console.error("Erreur durant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
