import {
  RequireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from '@00tickets00/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
const router = express.Router();

router.put(
  '/api/tickets/:id',
  RequireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new NotFoundError(); // 400
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError(); // 401
    }

    ticket.set({ title, price });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
