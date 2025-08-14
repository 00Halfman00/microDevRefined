import express from 'express';
const router = express.Router();
import { CurrentUser } from '@00tickets00/common';

console.log('CurrentUser: ', CurrentUser);

router.get('/api/users/currentuser', CurrentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
