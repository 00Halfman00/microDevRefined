import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

const generateTicket = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signupGetCookie())
    .send({
      title: 'Test Ticket',
      price: 35.99,
    });
};

describe('PUT /api/tickets/:id', () => {
  it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signupGetCookie())
      .send({
        title: 'Updated Ticket',
        price: 45.99,
      })
      .expect(404);
  });
});

describe('PUT /api/tickets/:id', () => {
  it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'Updated Ticket',
        price: 45.99,
      })
      .expect(401);
  });
});

describe('PUT /api/tickets/:id', () => {
  it('return a 401 if the user is not authenticated', async () => {
    const resp = await generateTicket();

    await request(app)
      .put(`/api/tickets/${resp.body.id}`)
      .set('Cookie', global.signupGetCookie()) // no cookie, not signed in
      .send({
        title: 'Updated Ticket',
        price: 45.99,
      })
      .expect(401);
  });
});

describe('PUT /api/tickets/:id', () => {
  it('return a 400 if the user provides an invalid title or price', async () => {
    const resp = await generateTicket();

    await request(app)
      .put(`/api/tickets/${resp.body.id}`)
      .set('Cookie', global.signupGetCookie())
      .send({
        title: '',
        price: 45.99,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${resp.body.id}`)
      .set('Cookie', global.signupGetCookie())
      .send({
        title: 'Test Ticket',
        price: -1,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${resp.body.id}`)
      .set('Cookie', global.signupGetCookie())
      .send({
        price: 45.99,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${resp.body.id}`)
      .set('Cookie', global.signupGetCookie())
      .send({
        title: 'Test Ticket',
      })
      .expect(400);
  });

  describe('PUT /api/tickets/:id', () => {
    it('return a 200 when the user is authenticated, provides valid input and ticket is updated', async () => {
      const cookie = global.signupGetCookie();
      const resp1 = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
          title: 'Test Ticket',
          price: 35.99,
        })
        .expect(201);

      const resp2 = await request(app)
        .put(`/api/tickets/${resp1.body.id}`)
        .set('Cookie', cookie) // no cookie, not signed in
        .send({
          title: 'Updated Ticket',
          price: 45.99,
        })
        .expect(200);

      console.log(resp1.body, '  ', resp2.body);
    });
  });
});

describe('PUT /api/tickets/:id', () => {
  it('publishes an event', async () => {
    const cookie = global.signupGetCookie();
    const resp1 = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'Test Ticket',
        price: 35.99,
      })
      .expect(201);

    const resp2 = await request(app)
      .put(`/api/tickets/${resp1.body.id}`)
      .set('Cookie', cookie) // no cookie, not signed in
      .send({
        title: 'Updated Ticket',
        price: 45.99,
      })
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});

// --- IGNORE ---
