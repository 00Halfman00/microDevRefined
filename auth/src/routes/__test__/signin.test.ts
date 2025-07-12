import request from 'supertest';
import { app } from '../../app';
import jwt from 'jsonwebtoken';

it('returns a 200 on a successful signin', async () => {
  const email = 'one@one.com';
  const password = 'onetwothree';
  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const responseSignin = await request(app)
    .post('/api/users/signin')
    .send({
      email,
      password,
    })
    .expect(200);

  expect(responseSignin.body).toBeDefined();
  expect(responseSignin.body.id).toBeDefined();
  expect(responseSignin.body.email).toBeDefined();
  expect(responseSignin.body.email).toEqual(email);

  // --- Cookie Handling and Assertions ---
  const signinCookie = responseSignin.get('Set-Cookie'); // This could be string | string[] | undefined
  expect(signinCookie).toBeDefined();
  expect(signinCookie).toEqual(
    expect.arrayContaining([expect.stringContaining('session=')])
  );
  expect(Array.isArray(signinCookie)).toBe(true);
  // --- FIX THE TYPESCRIPT ERROR HERE WITH A TYPE ASSERTION ---
  // We've already asserted at runtime that signinCookie is an array.
  // Now, tell TypeScript that you expect it to be a string array.
  const sessionCookieString = (signinCookie as string[])[0]
    .split(';')[0]
    .replace('session=', '');
  const decodedSession = JSON.parse(
    Buffer.from(sessionCookieString, 'base64').toString('utf8')
  );

  console.log(decodedSession);
  const decodedJwt = jwt.verify(
    decodedSession.jwt,
    process.env.JWT_KEY!
  ) as jwt.JwtPayload;

  expect(decodedJwt.id).toBeDefined();
  expect(decodedJwt.email).toEqual(email);
});

it('returns 400 on a signin with an invalid email', async () => {
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'two.com',
      password: 'onetwothree',
    })
    .expect(400);

  expect(response.body.errors).toBeDefined();
  expect(response.body.errors[0].message).toEqual(
    'Email must be a valid email'
  );
});

it('returns 400 on a signin with a nonexisting email', async () => {
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'three@one.com',
      password: 'onetwothree',
    })
    .expect(400);

  expect(response.body.errors).toBeDefined();
  expect(response.body.errors[0].message).toEqual('invalid credentials');
});

it('returns 400 because password is invalid', async () => {
  const email = 'four@one.com';
  const password = 'onetwothree';
  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const responseShort = await request(app)
    .post('/api/users/signin')
    .send({
      email,
      password: 'one',
    })
    .expect(400);
  expect(responseShort.body.errors).toBeDefined();
  expect(responseShort.body.errors[0].message).toEqual('invalid credentials');

  const responseLong = await request(app)
    .post('/api/users/signin')
    .send({
      email,
      password: 'onetwothreefourfivesix',
    })
    .expect(400);
  expect(responseLong.body.errors).toBeDefined();
  expect(responseLong.body.errors[0].message).toEqual('invalid credentials');
});

it('returns 400 because email/password is missing', async () => {
  const email = 'five@one.com';
  const password = 'onetwothree';
  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const responseNoEmail = await request(app)
    .post('/api/users/signin')
    .send({
      password,
    })
    .expect(400);
  expect(responseNoEmail.body.errors).toBeDefined();
  expect(responseNoEmail.body.errors[0].message).toEqual(
    'Email must be a valid email'
  );

  const responseNoPassword = await request(app)
    .post('/api/users/signin')
    .send({
      email,
    })
    .expect(400);
  expect(responseNoPassword.body.errors).toBeDefined();
  expect(responseNoPassword.body.errors[0].message).toEqual(
    'password cannot be empty'
  );

  const responseEmpty = await request(app)
    .post('/api/users/signin')
    .send({})
    .expect(400);
  expect(responseEmpty.body.errors).toBeDefined();
  expect(responseEmpty.body.errors.length).toBeGreaterThan(1);
});
