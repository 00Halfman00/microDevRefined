// import third-party modules/libraries
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
// import local middlewares
import { BadRequestError, validateRequest } from '@00tickets00/common';
import { User } from '../models/user';

// create a new Express router instance
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

// This router will handle the signup route for user registration
// It will validate the request body, check for existing users, create a new user, and
// issue a JWT token for the newly registered user
// The router will be exported for use in the main application file
// This file is responsible for handling user signup requests
// and will be mounted on the '/api/users/signup' path in the main app file.
// The router will respond with the created user object or an error if any validation fails.
