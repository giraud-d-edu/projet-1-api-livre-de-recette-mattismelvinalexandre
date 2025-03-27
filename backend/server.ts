import { Application, FormFile, multiParser, oakCors, send } from "./deps.ts";
import { errorHandler } from "./src/middleware/errors.ts";
import {
  ingredientRouter,
  globalRouter,
  recetteRouter,
} from "./src/routes/routes.ts";
const app = new Application();

app.use(
  oakCors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  })
);

// app.use(async (ctx) => {
//   const path = ctx.request.url.pathname;
//   if (path === "/upload") {
//     const form = await multiParser(await ctx.request.body.formData);
//     if (form) {
//       const image: FormFile = form.files.image as FormFile;
//       try {
//         await Deno.writeFile(`images/${image.filename}`, image.content);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//     ctx.response.body = '{"status": "ok"}';
//   }

//   if (ctx.request.method === "GET" && path.startsWith("/images")) {
//     await send(ctx, ctx.request.url.pathname, {
//       root: `${Deno.cwd()}`,
//     });
//   }
// });

app.use(errorHandler);

app.use(globalRouter.routes());
app.use(globalRouter.allowedMethods());
app.use(ingredientRouter.routes());
app.use(ingredientRouter.allowedMethods());
app.use(recetteRouter.routes());
app.use(recetteRouter.allowedMethods());

console.log("Server started on http://localhost:8000");
await app.listen({ port: 8000 });
