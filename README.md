# Netflix Clone - Projet Éducatif

Un clone de Netflix développé à des fins éducatives et de démonstration, avec une gestion de projet complète via GitHub.

## 📋 Présentation

Ce projet vise à reproduire les fonctionnalités principales de Netflix pour démontrer les bonnes pratiques de développement web et de gestion de projet. Il s'agit d'un projet à visée éducative uniquement.

## 🚀 Fonctionnalités

- **Interface utilisateur** inspirée de Netflix (carrousels, grilles, pages de détails)
- **Authentification** et gestion des utilisateurs
- **Lecture vidéo simulée** (avec des contenus libres de droits)
- **Interface d'administration** pour gérer les contenus

## 🛠️ Stack technique

### Frontend
- React / Next.js
- Styled Components
- Axios pour les requêtes API

### Backend
- Node.js avec Express
- MongoDB pour la base de données
- JWT pour l'authentification

### CI/CD et Déploiement
- GitHub Actions
- Docker

## 🏗️ Structure du projet

```
netflix-clone-educational/
├── client/                 # Application frontend React
│   ├── public/             # Assets publics
│   └── src/                # Code source React
│       ├── components/     # Composants réutilisables
│       ├── pages/          # Pages de l'application
│       ├── services/       # Services (API, auth, etc.)
│       ├── styles/         # Styles globaux
│       └── utils/          # Utilitaires
├── server/                 # API backend Node.js/Express
│   ├── config/             # Configuration
│   ├── controllers/        # Contrôleurs
│   ├── middlewares/        # Middlewares
│   ├── models/             # Modèles de données
│   ├── routes/             # Routes API
│   └── utils/              # Utilitaires
├── .github/                # Configuration GitHub (workflows CI/CD)
│   └── workflows/          # Workflows GitHub Actions
└── docs/                   # Documentation complémentaire
```

## 🚦 Démarrage rapide

### Prérequis
- Node.js v16+
- npm ou yarn
- MongoDB (local ou distant)

### Installation

1. Cloner le dépôt
```bash
git clone https://github.com/Kerlann/netflix-clone-educational.git
cd netflix-clone-educational
```

2. Installer les dépendances du frontend
```bash
cd client
npm install
```

3. Installer les dépendances du backend
```bash
cd ../server
npm install
```

4. Configurer les variables d'environnement
   - Copier `.env.example` vers `.env` dans les dossiers client et server
   - Remplir les variables nécessaires

5. Lancer l'application en développement
```bash
# Dans le dossier server
npm run dev

# Dans un autre terminal, dossier client
npm run dev
```

## 📊 Gestion de projet

Nous utilisons les fonctionnalités de GitHub pour gérer ce projet :

- **Issues** : Chaque fonctionnalité ou bug est documenté via une issue
- **Projects** : Tableau Kanban pour suivre l'avancement
- **Milestones** : Regroupement des issues par jalons
- **Pull Requests** : Validation du code par revue avant intégration
- **Branches** : Stratégie GitFlow adaptée

### Convention de nommage des branches
- `feature/nom-fonctionnalite` : Nouvelles fonctionnalités
- `bugfix/description-bug` : Correction de bugs
- `hotfix/description` : Correctifs urgents
- `release/x.y.z` : Préparation d'une version

### Convention de commits
Nous suivons le modèle [Conventional Commits](https://www.conventionalcommits.org/) :
```
type(scope): description courte

Description détaillée si nécessaire
```

Types courants : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🤝 Contribution

1. Créer une issue décrivant la fonctionnalité ou le bug
2. Créer une branche depuis `develop` en suivant la convention de nommage
3. Implémenter les changements avec des commits clairs
4. Pousser la branche et créer une Pull Request vers `develop`
5. Attendre la revue de code et les tests CI

## 📄 Licence

Ce projet est destiné uniquement à des fins éducatives et ne doit pas être utilisé en production ou à des fins commerciales.
