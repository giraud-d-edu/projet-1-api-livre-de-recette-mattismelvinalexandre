import { Application, oakCors } from "./deps.ts";
import { errorHandler } from "./src/middleware/errors.ts";
import {
  globalRouter,
  ingredientRouter,
  recetteRouter,
} from "./src/routes/routes.ts";
const app = new Application();

app.use(
  oakCors({
    origin: "*",
  }),
);

app.use(errorHandler);

app.use(globalRouter.routes());
app.use(globalRouter.allowedMethods());
app.use(ingredientRouter.routes());
app.use(ingredientRouter.allowedMethods());
app.use(recetteRouter.routes());
app.use(recetteRouter.allowedMethods());

console.log("Server started on http://localhost:8000");
await app.listen({ port: 8000 });
