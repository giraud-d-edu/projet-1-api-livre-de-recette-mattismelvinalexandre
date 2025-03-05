import { adminRoute, authenticatedRoute } from "../middleware.ts";
import { Router } from "../deps.ts";

export const pingRouter = new Router();

pingRouter.get("/", (ctx) => {
  ctx.response.body = "Bienvenue sur l'API de MMA";
});
