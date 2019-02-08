const request = require('supertest');
const app = require('../../../src/app');

describe('Test the Docs availability', () => {
  test('Successful GET /api/doc', async () => {
    const { status, type, redirect } = await request(app).get('/api/doc');
    expect(status).toEqual(301);
    expect(type).toEqual('text/html');
    expect(redirect).toBeTruthy();
  });

  test('Restricted not allowed methods', async () => {
    const { status, type, body } = await request(app).post('/api/doc');
    expect(status).toEqual(405);
    expect(type).toEqual('application/json');
    expect(body).toEqual({ message: 'Method Not Allowed' });
  });
});
