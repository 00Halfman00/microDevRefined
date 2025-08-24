import request from 'supertest';
import { app } from '../../app';

const generateTicket = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signupGetCookie())
    .send({
      title: 'Test Ticket',
      price: 35.99,
    });
};

describe('GET /api/tickets', () => {
  it('returns 200 after retrieving all tickets', async () => {
    for (let i = 0; i < 3; i++) {
      await generateTicket();
    }
    const res = await request(app).get('/api/tickets').send().expect(200);
    expect(res.body.length).toEqual(3);
  });
});
