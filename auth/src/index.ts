// import Express application instance
import { app } from './app';
// import database library
import mongoose from 'mongoose';

// NOTE:  The Node.js process itself always has an Event Loop running.
// It's the core mechanism that allows Node.js to handle asynchronous operations.

const startServers = async () => {
  // needed to create user's token
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    // Connect to MongoDB database; this asynchronous operation registers
    // database interactions with the Node.js Event Loop.
    const db = await mongoose.connect(
      'mongodb://auth-mongo-clusterip-srv:27017/auth-db'
    );
    console.log('auth-db SERVER listening on port 27017');
    console.log('TESTING LIVE RELOADING!!');
    // register with the Node.js Event Loop on that port. On incoming request,
    // schedule the appropriate callback (your Express app's handler) to be executed.
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

/*
app.listen(): Listening for Incoming Network Connections (HTTP Requests)

  This is indeed setting up a server that explicitly "listens"
  for incoming HTTP requests on a specific network port (like 3000).

  The Node.js Event Loop continuously monitors that port.
  When a new connectionor an HTTP request comes in,
  that's an event the Event Loop handles,
  and it dispatches it to your Express application.
  This is a continuous, passive listening for external clients.

mongoose.connect(): Managing an Outgoing Client Connection and Responses to Queries

  This is not listening for "Object-Document-Mapping" in the same way app.listen listens for requests.
  Instead, mongoose.connect() establishes an outgoing client connection to the MongoDB database server.

  Once connected, Mongoose (and the underlying MongoDB driver) uses this connection to:
    Send queries from your application to the database.
    Receive responses from the database back to your application.

  Both sending data out and receiving data back are asynchronous I/O operations.
  The Node.js Event Loop is responsible for efficiently managing these,
  ensuring your application doesn't block while waiting for the database to send back query results.

So, while both rely on the Event Loop for non-blocking I/O,
one sets up a listening server, and the other manages an active client connection to another server.
*/
