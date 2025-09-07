import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';

describe('POST /api/tickets', () => {
  it('route listens to /api/tickets for new ticket creation', async () => {
    const res = await request(app).post('/api/tickets').send({});
    expect(res.status).not.toEqual(404);
  });
});

describe('POST /api/tickets', () => {
  it('route can only be accessed if user is authenticated', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
  });
});

describe('POST /api/tickets', () => {
  it('route returns status code that is not 401, if user is authenticated', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({});
    expect(res.status).not.toEqual(401);
  });
});

describe('POST /api/tickets', () => {
  it('route returns 400 with error if ticket title is invalid', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({
        title: '',
        price: 35.99,
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({
        price: 35.99,
      })
      .expect(400);
  });
});

describe('POST /api/tickets', () => {
  it('route returns 400 with error if ticket price is invalid', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({
        title: 'Test Ticket',
        price: '-1',
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({
        title: 'Test Ticket',
      })
      .expect(400);
  });
});

describe('POST /api/tickets', () => {
  it('route returns 201 with new ticket created', async () => {
    // add check to verify ticket creation in database
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({
        title: 'Test Ticket',
        price: 35.99,
      })
      .expect(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual('Test Ticket');
    expect(tickets[0].price).toEqual(35.99);
  });
});

// Added test to verify event publishing
describe('POST /api/tickets', () => {
  it('publishes an event after ticket creation', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({
        title: 'Test Ticket',
        price: 35.99,
      })
      .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
