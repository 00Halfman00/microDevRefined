// import third-party libraries/modules
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cookieSession from 'cookie-session';

// import route handlers
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
// import error handler middleware
import { errorHandler, NotFoundError } from '@00tickets00/common';
console.log('auth/src/app.ts: Importing NotFoundError: ', NotFoundError);
// import middleware for parsing JSON request bodies
import { json } from 'body-parser';

// create variable, instantiating it as an Express application object
const app = express();

// Trust the proxy to handle forwarded headers (important for secure cookies)
app.set('trust proxy', true);
// Parse incoming JSON request bodies
app.use(json());
// Configure cookie-based session management for JWT storage
app.use(
  cookieSession({
    // Do not sign the cookie (JWT inside is signed already)
    signed: false,
    // Only set 'secure: true' in production (requires HTTPS); disable for local 'test' environment
    secure: process.env.NODE_ENV !== 'test',
  })
);

// register route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// Handle all other routes
app.all(
  '/{*splat}',
  async (req: Request, res: Response, next: NextFunction) => {
    const notFoundError = new NotFoundError();
    next(notFoundError);
  }
);

// Use global error handler middleware
app.use(errorHandler);

// make Express app available to other modules (e.g., tests or server startup)
export { app };
