import express from 'express';
const router = express.Router();
import { CurrentUser } from '../middlewares/current-user';

router.get('/api/users/currentuser', CurrentUser, async (req, res) => {
  res.send({ CurrentUser: req.currentUser || null });
});

export { router as currentUserRouter };
