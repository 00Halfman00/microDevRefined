import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    // When exteding another class
    super('Invalid request parameters');
    // When exteding a built in class to the language using tpescript
    // When checking if error is an instance of CustomError, this line
    // of code below is needed to check if an instance of RequestValidationError
    // is an instance of CustomError
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((e) => {
      if (e.type === 'field') {
        return { message: e.msg, field: e.path };
      }
      return { message: e.msg };
    });
  }
}
