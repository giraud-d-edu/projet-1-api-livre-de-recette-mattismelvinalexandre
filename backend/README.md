## Initialiser le projet

- MongoDB Community Server d'installé:
  https://www.mongodb.com/try/download/community
- MongoDB Compass (pour avoir un GUI si besoin pour créer les tables):
  https://www.mongodb.com/fr-fr/products/tools/compass
- Lancer Mongo en `localhost`
- Créer la Base de données "recette"
- Créer les collections "ingredients" et "recette"
- Installer Deno: https://docs.deno.com/runtime/getting_started/installation/
- Installer Postman pour tester les routes : https://www.postman.com/downloads/
- Créer un deno.env à partir de deno.env.exemple

![alt text](./public/image.png)

## Lancer le projet

Exécutez dans le dossier 'backend' :
`deno --allow-net --env-file=deno.env --allow-env --allow-read --watch --allow-sys  server.ts`

Si vous ne voyez pas:
`Connected to MongoDB
Server started on http://localhost:8000` => Vérifiez les
informations dans `deno.env` nottament "MONGO_URI" et "MONGO_DB" => Vérifiez
qu'il n'y a pas de conflit de ports.`localhost`

## Postman

Vous pouvez importer la collection `API Recettes Deno.postman_collection.json`
disponible à la racine du repo.

## MongoDB - Importation des données

Pour faciliter l'initialisation de la base de données, vous pouvez importer les
dumps des collections `recettes` et `ingredients` directement dans **MongoDB
Compass** :

1. Ouvrez **MongoDB Compass**.
2. Naviguez vers la base de données `recette`.
3. Cliquez sur la collection `ingredients` ou `recettes`.
4. Sélectionnez **"Import Data"**.
5. Choisissez le fichier JSON correspondant :
   - `recette.ingredients.json` pour les ingrédients.
   - `recette.recettes.json` pour les recettes.
6. Validez l'importation.

Cela permettra de pré-remplir les collections avec des données de test pour
démarrer rapidement.
