import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

jest.mock('../nats-wrapper');

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = 'willi wanka and the umpa lumpas';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

declare global {
  var signupAndGetCookie: (
    email: string,
    password: string
  ) => Promise<{ id: string; email: string; cookie: string[] }>;
}
declare global {
  var signupGetCookie: () => string[];
}

global.signupGetCookie = () => {
  // Build a JWT payload.  { id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'one@one.com',
  };
  // Create JWT.
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build Session Object.  { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn the session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON  and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}; path=/; secure; httponly`];
};

global.signupAndGetCookie = async (email, password) => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const userCookie = response.get('Set-Cookie') as string[];

  if (!userCookie || !Array.isArray(userCookie) || !userCookie.length) {
    throw new Error(
      'global.signupAndGetCookie: Set-Cookie header missing or empty.'
    );
  }
  const userId = response.body.id;
  const userEmail = response.body.email;

  return { id: userId, email: userEmail, cookie: userCookie };
};
