import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  reason = 'database is down';
  statusCode = 500;
  constructor() {
    // When exteding another class
    super('database is down');
    // When exteding a built in class to the language using tpescript
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
