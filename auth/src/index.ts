import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
// route handlers
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { NotFoundRouter } from './routes/route-not-found';
// error handler
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

// use route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(NotFoundRouter);
// use error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log('auth SERVER listening on port 3000');
});
