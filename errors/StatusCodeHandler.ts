import { Status } from "../deps.ts";

// deno-lint-ignore no-explicit-any
export const statusCodeHandler = (error: any): number => {
  if (error.statusCode) {
    return error.statusCode;
  }
  return Status.InternalServerError;
};
