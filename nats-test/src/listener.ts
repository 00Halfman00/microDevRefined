import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('tickets', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

// Graceful shutdown handling
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
process.on('SIGQUIT', () => stan.close());

stan.on('close', () => {
  console.log('NATS connection closed');
  process.exit();
});

const start = async () => {
  try {
    // Await the connection event using a Promise wrapper
    await new Promise<void>((resolve, reject) => {
      stan.on('connect', () => {
        console.log('Listener connected to NATS');
        resolve();
      });
      stan.on('error', (err) => {
        console.log('Error connecting to NATS');
        reject(err);
      });
    });

    // Start listening for events once connected
    new TicketCreatedListener(stan).listen();
  } catch (err) {
    console.error('Failed to connect to NATS or an error occurred:', err);
  }
};

start();
