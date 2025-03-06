import { ZodError, Application, isHttpError } from "./deps.ts";
import { statusCodeHandler } from "./errors/StatusCodeHandler.ts";
import {
  ingredientRouter,
  pingRouter,
  recetteRouter,
} from "./routes/routes.ts";
const app = new Application();

app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ZodError) {
      context.response.status = 400;
      context.response.body = err.errors.map((e) => ({
        path: e.path,
        message: e.message,
      }));
    } else if (isHttpError(err)) {
      context.response.status = err.status;
      context.response.body = err.message;
    } else if (err instanceof Error) {
      context.response.status = statusCodeHandler(err);
      context.response.body = err.message;
    } else {
      context.response.status = 500;
      context.response.body = (err as Error).message;
    }
    context.response.type = "json";
  }
});

app.use(pingRouter.routes());
app.use(pingRouter.allowedMethods());
app.use(ingredientRouter.routes());
app.use(ingredientRouter.allowedMethods());
app.use(recetteRouter.routes());
app.use(recetteRouter.allowedMethods());

console.log("Server started on http://localhost:8000");
await app.listen({ port: 8000 });
