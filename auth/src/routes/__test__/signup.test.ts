import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on a successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);
});
