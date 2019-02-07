const request = require('supertest');
const app = require('../../../src/app');

describe('Test the "System" endpoints', () => {
  test('Successful GET /api/test/ping', async () => {
    const { status, type, body } = await request(app).get('/api/test/ping');
    expect(status).toEqual(200);
    expect(type).toEqual('application/json');
    expect(Object.keys(body).sort()).toEqual(['data', 'meta']);
    expect(body.data).toEqual('pong');
    expect(body.meta.handlingTime).toBeDefined();
    expect(body.meta.handlingTime).toBeLessThanOrEqual(250);
  });

  test('Restricted not allowed methods', async () => {
    const { status, type, body } = await request(app).post('/api/test/ping');
    expect(status).toEqual(405);
    expect(type).toEqual('application/json');
    expect(body).toEqual({ message: 'Method Not Allowed' });
  });
});
