export class DatabaseConnectionError extends Error {
  reason = 'database is down';
  constructor() {
    // When exteding another class
    super();
    // When exteding a built in class to the language using tpescript
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
