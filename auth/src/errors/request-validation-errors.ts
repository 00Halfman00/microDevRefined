import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    // When exteding another class
    super();
    // When exteding a built in class to the language using tpescript
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
