import request from 'supertest';
import { app } from '../../app';

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
    // const res = await request(app).post('/api/users/signup').send({
    //   email: 'one@one.com',
    //   password: 'onetwothree',
    // });
    // expect(res.status).toBe(201);
    // expect(res.body).toHaveProperty('id');
  });
});

describe('POST /api/tickets', () => {
  it('route returns 400 with error if ticket title is invalid', async () => {
    // const res = await request(app).post('/api/tickets').send({
    //   title: 'Test Ticket',
    //   price: '35.99',
    // });
    // expect(res.status).toBe(201);
    // expect(res.body).toHaveProperty('id');
  });
});

describe('POST /api/tickets', () => {
  it('route returns 400 with error if ticket price is invalid', async () => {
    // const res = await request(app).post('/api/tickets').send({
    //   title: 'Test Ticket',
    //   price: '35.99',
    // });
    // expect(res.status).toBe(201);
    // expect(res.body).toHaveProperty('id');
  });
});

describe('POST /api/tickets', () => {
  it('route returns 200 with new ticket created', async () => {
    // const res = await request(app).post('/api/tickets').send({
    //   title: 'Test Ticket',
    //   price: '35.99',
    // });
    // expect(res.status).toBe(201);
    // expect(res.body).toHaveProperty('id');
  });
});
