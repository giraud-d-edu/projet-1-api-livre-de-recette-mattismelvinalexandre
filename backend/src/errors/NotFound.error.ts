import { Status } from "../../deps.ts";

export default class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = Status.NotFound;
  }
}
