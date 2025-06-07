import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();
import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-error';

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters.'),
  ],
  (req: Request, res: Response) => {
    console.log('singup');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // throw new Error('Invalid email or password caught in signup.ts'); when just passing generic error
      // return res.status(400).send(errors.array());  when sending simple response
      throw new RequestValidationError(errors.array());
    }
    // throw new Error('Error connecting to database.');  when just passing generic error
    throw new DatabaseConnectionError();
    const { email, password } = req.body;
    const user = { email, password };
    res.send(user);
  }
);

export { router as signupRouter };
