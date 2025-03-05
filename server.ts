import { Application } from "./deps.ts";
import { pingRouter } from "./routes/routes.ts";
const app = new Application();

app.use(pingRouter.routes());
app.use(pingRouter.allowedMethods());

console.log("Server started on http://localhost:8000");
await app.listen({ port: 8000 });
