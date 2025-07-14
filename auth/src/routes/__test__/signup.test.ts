import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on a successful signup', async () => {
  const email = 'one@one.com';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password: 'onetwothree',
    })
    .expect(201);

  expect(response.body).toBeDefined();
  expect(response.body.id).toBeDefined();
  expect(response.body.email).toBeDefined();
  expect(response.body.email).toEqual(email);
  expect(response.get('Set-Cookie')).toBeDefined();
  expect(response.get('Set-Cookie')).toEqual(
    expect.arrayContaining([expect.stringContaining('session=')])
  );
});

it('returns 400 on a signup with an invalid email', async () => {
  const response = await request(app)
    .post('/api/users/signup')
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

it('returns 400 on a signup with an existing email', async () => {
  const email = 'three@one.com';
  const password = 'onetwothree';
  await signupAndGetCookie(email, password);

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'three@one.com',
      password: 'onetwothree',
    })
    .expect(400);

  expect(response.body.errors).toBeDefined();
  expect(response.body.errors[0].message).toEqual('Email already in use');
});

it('returns 400 because password is invalid', async () => {
  const responseShort = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'four@one.com',
      password: 'one',
    })
    .expect(400);
  expect(responseShort.body.errors).toBeDefined();
  expect(responseShort.body.errors[0].message).toEqual(
    'Password must be between 8 and 20 characters.'
  );

  const responseLong = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'fourtwo@one.com',
      password: 'onetwothreefourfivesix',
    })
    .expect(400);
  expect(responseLong.body.errors).toBeDefined();
  expect(responseLong.body.errors[0].message).toEqual(
    'Password must be between 8 and 20 characters.'
  );
});

it('returns 400 because email/password is missing', async () => {
  const responseNoEmail = await request(app)
    .post('/api/users/signup')
    .send({
      password: 'onetwothree',
    })
    .expect(400);
  expect(responseNoEmail.body.errors).toBeDefined();
  expect(responseNoEmail.body.errors[0].message).toEqual(
    'Email must be a valid email'
  );

  const responseNoPassword = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'five@one.com',
    })
    .expect(400);
  expect(responseNoPassword.body.errors).toBeDefined();
  expect(responseNoPassword.body.errors[0].message).toEqual(
    'Password must be between 8 and 20 characters.'
  );

  const responseEmpty = await request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
  expect(responseEmpty.body.errors).toBeDefined();
  expect(responseEmpty.body.errors.length).toBeGreaterThan(1);
});
