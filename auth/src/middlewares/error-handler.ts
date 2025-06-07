import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  // subclass of built in Error class
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((e) => {
      if (e.type === 'field') {
        return { message: e.msg, field: e.path };
      }
    });
    return res.status(400).send({ erros: formattedErrors });
  }
  // subclass of built in Error class
  if (err instanceof DatabaseConnectionError) {
    console.log('err instance of DatabaseConectionError subclass');
    return res.status(500).send({ message: err.reason });
  }
  res.status(400).send({
    errors: [{ message: 'Not good.' }],
  });
};
