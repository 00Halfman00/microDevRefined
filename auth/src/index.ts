import { app } from './app';
import mongoose from 'mongoose';

const startServers = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    const db = await mongoose.connect(
      'mongodb://auth-mongo-clusterip-srv:27017/auth-db'
    );
    console.log('process.env.JWT_KEY: ', process.env.JWT_KEY);
    console.log('auth-db SERVER listening on port 27017');
    console.log('LIVE RELOADING!');
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
