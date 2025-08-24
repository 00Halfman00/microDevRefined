import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('GET /api/tickets/:id', () => {
  it('returns 404 if ticket not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const resp = await request(app)
      .get(`/api/tickets/${id}`)
      .set('Cookie', global.signupGetCookie())
      .send()
      .expect(404);
  });
});

describe('GET /api/tickets/:id ', () => {
  it('returns 200 if ticket is found', async () => {
    const title = 'Test Ticket';
    const price = 35.99;
    const resp = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signupGetCookie())
      .send({ title, price })
      .expect(201);
    const ticketResp = await request(app)
      .get(`/api/tickets/${resp.body.id}`)
      .set('Cookie', global.signupGetCookie())
      .send()
      .expect(200);

    if (ticketResp) {
      expect(ticketResp.body.userId).toBeDefined();
      expect(ticketResp.body.title).toEqual(title);
      expect(ticketResp.body.price).toEqual(price);
    }
  });
});
