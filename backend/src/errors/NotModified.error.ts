import { Status } from "../../deps.ts";

export default class NotModifiedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = Status.NotModified;
  }
}
