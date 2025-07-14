import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on confirming user is authenticated', async () => {
  const testEmail = 'one@one.com';
  const testPassword = 'onetwothree';
  const { id, email, cookie } = await signupAndGetCookie(
    testEmail,
    testPassword
  );

  const currentUserResponse = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(currentUserResponse.body.currentUser).toBeDefined();
  expect(currentUserResponse.body.currentUser.id).toEqual(id);
  expect(currentUserResponse.body.currentUser.email).toEqual(email);
});

it('returns a 200 if user is not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
  expect(response.body).toEqual({ currentUser: null });
});
