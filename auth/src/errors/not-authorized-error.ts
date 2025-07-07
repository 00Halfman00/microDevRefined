import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super('Not authorized to view route/s');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
