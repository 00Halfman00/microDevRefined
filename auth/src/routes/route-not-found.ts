import express from 'express';
import 'express-async-errors';
import { NotFoundError } from '../errors/not-found-error';

const router = express.Router();

router.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

export { router as NotFoundRouter };
