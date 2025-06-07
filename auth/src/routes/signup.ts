import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
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
  (req: Request, res: Response) => {
    console.log('singup');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;
    const user = { email, password };
    res.send(user);
  }
);

export { router as signupRouter };
