import request from 'supertest';
import { app } from '../../app';

it('it returns a 200 on clearing cookie after a signout', async () => {
  const email = 'one@one.com';
  const password = 'onetwothree';
  await signupAndGetCookie(email, password);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  const userCookie = response.get('Set-Cookie');
  expect(userCookie).toBeDefined();
  expect(Array.isArray(userCookie)).toBe(true);
  expect(userCookie?.length).toBeGreaterThan(0);

  const sessionCookieString = (userCookie as string[])[0];
  expect(sessionCookieString).toContain('session=;');
  expect(sessionCookieString).toContain('path=/;');
  expect(sessionCookieString).toContain(
    'expires=Thu, 01 Jan 1970 00:00:00 GMT;'
  );
  expect(sessionCookieString).toContain('httponly');
});
