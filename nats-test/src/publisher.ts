import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();

const stan = nats.connect('tickets', 'abc', { url: 'http://localhost:4222' });
const publisher = new TicketCreatedPublisher(stan);

const start = async () => {
  try {
    // This awaits the NATS connection
    await new Promise<void>((resolve, reject) => {
      stan.on('connect', () => {
        console.log('Publisher connected to NATS');
        resolve();
      });
      stan.on('error', (err) => {
        reject(err);
      });
    });

    // This awaits the publish call and its promise
    await publisher.publish({
      id: '123',
      title: 'Test Ticket',
      price: 20,
    });
    console.log('Event published successfully!');
  } catch (err) {
    console.error('Failed to connect to NATS or publish event:', err);
  }
};

start();

// Graceful shutdown handling
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
process.on('SIGQUIT', () => stan.close());

stan.on('close', () => {
  console.log('NATS connection closed!');
  process.exit();
});
