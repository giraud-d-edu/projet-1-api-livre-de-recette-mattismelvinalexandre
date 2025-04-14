# 🍽️ Projet Recettes  

Bienvenue dans le **Projet Recettes**, une application complète pour gérer vos recettes de cuisine. Ce projet propose une interface intuitive pour explorer, créer, modifier et supprimer des recettes, tout en gérant les ingrédients associés. Il est conçu pour offrir une expérience utilisateur fluide grâce à un frontend moderne basé sur **SvelteKit** et un backend robuste développé avec **Deno** et **MongoDB**.  

Que vous soyez un amateur de cuisine ou un développeur cherchant à explorer une architecture full-stack, ce projet est fait pour vous !

---

## 🚀 Installation et démarrage  

Consultez les guides spécifiques à chaque partie du projet :  
- **Backend** : [Installation et configuration](https://github.com/giraud-d-edu/projet-1-api-livre-de-recette-mattismelvinalexandre/blob/ddf8606941a6427b5d398f511159918082e96906/backend/README.md).

- **Frontend** : [Installation et démarrage](https://github.com/giraud-d-edu/projet-1-api-livre-de-recette-mattismelvinalexandre/blob/0dae6dbf21b40fc8120c8f052caac8b240076732/front/README.md).  
  

---

## 🚀 Changement depuis la soutenance

- ✅ Correction de la recherche par ingrédient.
- ✅ Suppression des ingrédients dans une recette lorsque ceux-ci sont supprimés.
- ✅ Mise de côté du filtre dans le frontend (complexité jugée inutile pour le moment).
- ✅ Export des données MongoDB désormais disponible.
- ✅ Ajout d'alertes pour les actions d'ajout, modification et suppression.
- ✅ Composant RecetteForm -> fusion edit/create

---

## 🚀 Axes d'amélioration

- 🔧 Séparer la quantité dans une recette en deux champs : `quantity` et `unit` (actuellement tout est en grammes).
- 🔧 Mettre à jour les script Postman
- 🔧 Trouver une bibliothèque maintenue pour la gestion des imports d'images.
- 🔧 Simplifier les projets futurs : se concentrer uniquement sur les recettes et les fonctionnalités essentielles. Les ingrédients ajoutent une complexité qui n'est pas toujours nécessaire compte tenu du temps alloué.


