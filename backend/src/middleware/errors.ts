import { Context, isHttpError, Next, Status, ZodError } from "../../deps.ts";
import { statusCodeHandler } from "../errors/StatusCodeHandler.ts";

export const errorHandler = async (context: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ZodError) {
      context.response.status = Status.BadRequest;
      context.response.body = err.errors.map((e) => ({
        path: e.path,
        message: e.message,
      }));
    } else if (isHttpError(err)) {
      context.response.status = err.status;
      context.response.body = err.message;
    } else if (err instanceof Error) {
      context.response.status = statusCodeHandler(err);
      if (context.response.status !== Status.NotModified) {
        context.response.body = err.message;
      }
    } else {
      context.response.status = Status.InternalServerError;
      context.response.body = (err as Error).message;
    }
    console.log(
      `Error: ${context.request.method} ${context.request.url} - ${context.response.status} - ${err}`,
    );
    context.response.type = "json";
  }
};
