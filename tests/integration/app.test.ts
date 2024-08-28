import request from 'supertest';
import { Express } from 'express';
import setUpApp from '../../src/setUpApp';
import { DB } from '../../src/typeorm/data-source';

/**
 * Testing the Index Page Layout
 * - GET /
 */
describe('GET /', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setUpApp();
  });

  afterAll(async () => {
    await DB.destroy();
  });

  it('It should return Status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('It should contain certain values in the response.body', async () => {
    const response = await request(app).get('/');
    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('message');
    expect(response.body?.message).toBe('Yaaaay! You have hit the API root.');
  });
});
