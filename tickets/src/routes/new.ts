import { RequireAuth } from '@00tickets00/common';
import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/api/tickets', RequireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as newTicketRouter };
