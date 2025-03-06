import { Status } from "../deps.ts";

export default class BadRequestError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = Status.BadRequest;
  }
}
