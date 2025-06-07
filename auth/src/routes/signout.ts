import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  console.log('singout');
  res.send({});
});

export { router as signoutRouter };
