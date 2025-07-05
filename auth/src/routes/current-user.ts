import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.get('/api/users/currentuser', async (req, res) => {
  console.log(req.session);
  if (!req.session?.jwt) {
    res.send({ currentUser: null });
  }
  try {
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
