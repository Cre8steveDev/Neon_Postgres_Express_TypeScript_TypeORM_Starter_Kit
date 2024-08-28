import request from 'supertest';
import { Express } from 'express';
import setUpApp from '../../src/setUpApp';
import { DB } from '../../src/typeorm/data-source';

/**
 * Testing the Sign Up Route
 */
describe('POST /api/v1/auth/signup', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setUpApp();
  });

  it('should create a new user', async () => {
    const formData = {
      fullName: 'Fillipe Doe',
      email: 'fillipedoe@example.com',
      dateOfBirth: '1990-01-01',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(formData);

    expect(response.status).toBe(201);
    expect(response.body?.success).toBe(true);
    expect(response.body?.message).toBe('User Account created successfully.');
  });

  it('should return error if user already exists', async () => {
    const formData = {
      fullName: 'John Doe',
      email: 'janedoe@example.com',
      dateOfBirth: '1990-01-01',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(formData);

    expect(response.status).toBe(400);
    expect(response.body?.success).toBe(false);
    expect(response.body?.message).toBe('User already exists.');
  });

  it('should return error if form data is invalid', async () => {
    const formData = {
      FULLNAME: 'A name',
      email: 'testing@gmail.com',
      dateOfBirth: '1990-01-01',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(formData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Required');
  });

  afterAll(async () => {
    await DB.destroy();
  });
});
