# 🧮 MathFacile – Plateforme d'exercices mathématiques interactive

![Aperçu du site](./frontend/public/HomePage_MathFacile.png)

> Accès à l’application : [http://localhost:5173](http://localhost:5173)

---

## ✨ Présentation

MathFacile est une application éducative qui permet aux élèves de s'exercer aux mathématiques en ligne. Les exercices sont générés dynamiquement en C++ (via WebAssembly), et la plateforme propose une gestion complète de l'authentification utilisateur.

L’objectif est double :
- Fournir une expérience pédagogique interactive et agréable.
- Servir de projet personnel démontrant des compétences fullstack modernes.

---

## 🧰 Stack Technique

### 🎨 Frontend — Vue.js + TypeScript

| Technologie     | Rôle |
|----------------|------|
| **Vue 3** + **TypeScript** | Framework principal de l’application SPA |
| **Pinia**       | Gestion d’état globale (authentification, flash messages…) |
| **Vue Router**  | Navigation dynamique entre pages |
| **Tailwind CSS**| Design responsive moderne et rapide à personnaliser |
| **KaTeX**       | Rendu élégant d'équations mathématiques |
| **Cypress**     | 🔜 Tests end-to-end à venir |


### 🔙 Backend — Node.js + Express

| Technologie       | Rôle |
|------------------|------|
| **Express.js**    | API REST légère et modulaire |
| **TypeScript**    | Typage fort pour fiabilité et maintenabilité |
| **JWT + Cookies HTTP-Only** | Authentification sécurisée |
| **Prisma ORM** + **SQLite** | Base de données typée, légère et intégrée |
| **Structure MVC** | Contrôleurs, services, middleware : responsabilités bien séparées |


### 🧠 Génération d’exercices — C++ & WebAssembly

| Composant | Description |
|-----------|-------------|
| **C++17 + Emscripten** | Compilation en WebAssembly pour exécution dans le navigateur |
| **Modules indépendants** | Chaque type d’exercice est un module : `linear`, `quadratic`, `derivative`... |
| **Architecture claire** |
- `generator.cpp` : génère une question
- `verifier.cpp` : vérifie la réponse + fournit la solution correcte
- `exercises_loader.cpp` : centralise les types d'exercices disponibles
- `exercises_generator.cpp` : oriente dynamiquement selon le type demandé |
  | **TypeScript ↔ WebAssembly** | Intégration frontend via `wasmLoader.ts` |


---
## 🏗️ Architecture du projet

```
math-app/
├── backend/                → Backend Node.js/Express + Prisma + JWT
│   ├── prisma/            → Base de données SQLite + migrations Prisma
│   ├── src/
│   │   ├── config/        → Configuration globale (CORS)
│   │   ├── controllers/   → Logique métier (auth.controller.ts)
│   │   ├── db/            → Connexion à Prisma
│   │   ├── middleware/    → Vérification JWT
│   │   ├── routes/        → Définition des endpoints API REST
│   │   ├── services/      → Fonctions réutilisables (génération JWT)
│   │   └── types/utils/   → Types TypeScript et helpers
│   └── server.ts          → Point d'entrée du serveur Express
│
├── src/                   → Frontend Vue 3 + TypeScript + Tailwind CSS
│   ├── components/        → Composants réutilisables
│   ├── pages/             → Pages Vue pour chaque route
│   ├── stores/            → Pinia (état global : auth, flash)
│   ├── composables/       → Logique réutilisable (useExercises, useCategories)
│   ├── assets/            → Styles globaux, images, catégories
│   ├── api/               → Axios préconfiguré
│   ├── router/            → Vue Router
│   ├── wasm/              → Fichiers WebAssembly générés
│   └── utils/             → wasmLoader.ts
│
├── src/cpp/               → Code C++ compilé en WebAssembly (exercices)
│   ├── core/              → Loader et orchestrateur de génération/vérification
│   │   ├── exercises_generator.cpp/.h
│   │   └── exercises_loader.cpp/.h
│   └── modules/           → Modules spécialisés par type d'exercice
│       ├── linear/        → Génération et vérification des équations linéaires
│       ├── derivative/    → Dérivées
│       └── quadratic/     → Équations quadratiques
│
├── public/                → Fichiers publics accessibles (logo, favicon...)
├── README.md              → Documentation du projet (ce fichier)
├── vite.config.ts         → Config Vite
└── tsconfig*.json         → Config TypeScript
```
---

## 📚 Fonctionnalités clés

- 🔐 Authentification sécurisée (cookies HTTP-only, JWT)
- 🧠 Exercices générés aléatoirement en C++
- ✅ Vérification avancée des réponses (y compris racines complexes)
- 🎯 Navigation fluide entre les exercices
- 💡 Design responsive et moderne
- 🧩 Architecture modulaire (backend, frontend, wasm, etc.)
---

## 🛣️ Objectifs pédagogiques atteints

- ✅ Structuration claire d’un projet frontend + backend
- ✅ Séparation des responsabilités, modularisation
- ✅ Compréhension poussée de WebAssembly, compilation C++ → JS
- ✅ Sécurisation de l’authentification avec JWT + cookies
- ✅ Utilisation de Prisma et base de données relationnelle
- ✅ Design moderne, responsive et cohérent
- ✅ Écriture de composants réutilisables et typés

---

## ✨ Améliorations futures

- [ ] Ajout d’un tableau de bord utilisateur
- [ ] Historique des réponses
- [ ] Système de progression
- [ ] Interface pour proposer des exercices
- [ ] Mode enseignant

---

## 👨‍💻 Auteur

**Fedi Ghalloussi**  
Ingénieur logiciel junior passionné par le développement web,.  
📎 [Portfolio](https://fedighalloussi.vercel.app)

---

## 🪪 Licence

Ce projet est open-source sous licence MIT.