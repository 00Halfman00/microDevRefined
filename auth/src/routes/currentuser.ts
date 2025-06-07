import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  console.log('currentuser');
  res.send(`<h1>Dockermon</h1>`);
});

export { router as currentUserRouter };
