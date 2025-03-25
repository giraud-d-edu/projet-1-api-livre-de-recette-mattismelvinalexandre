import { MongoClient } from "../../../deps.ts";
import { IngredientDBO } from "../dbos/ingredient.dbo.ts";
import { RecetteDBO } from "../dbos/recette.dbo.ts";

const MONGO_URI = Deno.env.get("MONGO_URI");
const MONGO_DB = Deno.env.get("MONGO_DB");

if (!MONGO_URI) {
  console.error("MONGODB_URI is not set");
  Deno.exit(1);
}
if (!MONGO_DB) {
  console.error("MONGODB_DB is not set");
  Deno.exit(1);
}
const client = new MongoClient(MONGO_URI);

try {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);

  Deno.exit(1);
}
const db = client.db(MONGO_DB);

export const ingredientCollection = db.collection<IngredientDBO>("ingredients");
export const recetteCollection = db.collection<RecetteDBO>("recettes");
