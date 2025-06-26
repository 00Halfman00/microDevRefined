import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
// testing db
import { User } from './models/user';

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

const startServers = async () => {
  try {
    const db = await mongoose.connect(
      'mongodb://auth-mongo-clusterip-srv:27017/auth-db'
    );
    console.log('auth-db SERVER listening on port 27017');
    // const user = User.build({
    //   email: 'one@one.com',
    //   password: 'onetwothree',
    // });

    // console.log('user: ', user);

    app.listen(3000, () => {
      console.log('auth SERVER listening on port 3000');
    });
  } catch (err) {
    console.error('Error starting auth and auth-db SERVERS', err);
    // Optionally, exit the process if a critical startup component fails
    process.exit(1);
  }
};

startServers();
