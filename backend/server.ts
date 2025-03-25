import { Application } from "./deps.ts";
import { errorHandler } from "./src/middleware/errors.ts";
import {
  ingredientRouter,
  pingRouter,
  recetteRouter,
} from "./src/routes/routes.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
const app = new Application();

app.use(
  oakCors({
    origin: "*",
  })
);

app.use(errorHandler);

app.use(pingRouter.routes());
app.use(pingRouter.allowedMethods());
app.use(ingredientRouter.routes());
app.use(ingredientRouter.allowedMethods());
app.use(recetteRouter.routes());
app.use(recetteRouter.allowedMethods());

console.log("Server started on http://localhost:8000");
await app.listen({ port: 8000 });
