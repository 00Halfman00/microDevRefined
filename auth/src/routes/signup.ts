import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();
import { RequestValidationError } from '../errors/request-validation-errors';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters.'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('User alredy exist in database');
    }

    const user = User.build({ email, password });
    await user.save();
    res.status(201).send(user);
  }
);

export { router as signupRouter };
