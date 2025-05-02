Medi store est une application de gestion de stock dédiée aux structures hospitalières. Elle

## Getting Started

Cloner le projet. Ensuite exécuter la commande

```bash
npm install
```

pour installer les dépendances. Puis exécuter la commande

```bash
npm run dev
```

pour lancer le projet en local.

Ouvrir [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le rendu.

## Architecture du projet

Le code du projet se trouve principalement dans deux (2) dossiers:

- le dossier **prisma** qui gère les modèles de données
- le dossier **src**

Le dossier **src** contient un ensemble de sous-dossiers: 

- le sous-dossiers **app** qui contient les pages, layouts et les API handlers.
- le sous-dossiers **components** qui regroupe les composants réutilisables dans plusieurs pages ou d'autres composants.
- le sous-dossiers **features** regroupe les différents modules de l'application (authentification, produits, commandes, stocks). Chaque module
  suit une organisation basée sur **l'architecture hexagonale**. Il contient donc des sous-dossiers **domain** pour gérer le *domaine métier*,
  **infrastructure** pour gérer comme son nom l'indique l'indique *l'infrastructure*(l'ORM prisma), **application** pour gérer les *use case* et enfin
  **presentation** qui contient les composants UI propres au module.
- le sous-dossier **hooks** contient des custom hooks et des hooks issus de librairies utilisées pour le projet.
- le sous-dossier **lib** contient des utilitaires, des outils issus de librairies utilisées, telles next-auth et un singleton pour instancier un client prisma qui nous permet de gérer nos modèles de données. Il contient un sous-dossier **usecases** qui est une sorte de factory qui regroupe tous nos *use cases* prêts à l'emploi, pour être appelés aussi bien dans les API route que dans nos composants serveurs directement.

## Technologies utilisées

- **TypeScript** comme langage de programmation.
- **Next.js** comme framework.
- **Prisma** comme ORM
- **shadcn UI** pour la librairie de composants UI.
- **tailwindcss** pour les styles
- **next-auth** pour la gestion de l'authentification et session utilisateur
- **tanstack/react-table** pour la gestion de la logique des tableaux
- **tanstack/react query** pour le data fetching
- **date-fns** pour la gestion des dates
- **bcryptjs** pour le hashage des mots de passe
- **jsonwebtoken** pour les tokens
- **react-hook-form** pour les formulaires


