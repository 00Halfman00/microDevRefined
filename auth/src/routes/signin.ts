import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@00tickets00/common';
import { User } from '../models/user';
import { PasswordManager } from '../services/passwordManager';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').trim().notEmpty().withMessage('password cannot be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('invalid credentials');
    }

    const passwordMatch = await PasswordManager.compare(
      password,
      existingUser.password
    );

    if (!passwordMatch) {
      throw new BadRequestError('invalid credentials');
    }

    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.send(existingUser);
  }
);

export { router as signinRouter };
