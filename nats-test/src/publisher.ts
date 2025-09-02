import nats from 'node-nats-streaming';
console.clear();

const stan = nats.connect('tickets', 'abc', { url: 'http://localhost:4222' });

stan.on('connect', () => {
  console.log('Publisher connected to NATS');
  const data = JSON.stringify({ id: '123', title: 'Test Ticket', price: 20.0 });
  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
