import express from 'express';
import { NotFoundError } from '@00tickets00/common';

const router = express.Router();

router.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

export { router as NotFoundRouter };
