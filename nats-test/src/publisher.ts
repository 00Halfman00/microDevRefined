import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();

const stan = nats.connect('tickets', 'abc', { url: 'http://localhost:4222' });

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish({
    id: '123',
    title: 'Test Ticket',
    price: 20,
  });
});

// Graceful shutdown handling
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
process.on('SIGQUIT', () => stan.close());

stan.on('close', () => {
  console.log('NATS connection closed!');
  process.exit();
});
