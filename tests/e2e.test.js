const request = require('supertest');
const app = require('../src/app');

describe('Test apllications features', () => {
  test('Successful catching 404', async () => {
    const { status, type, body } = await request(app).get('/not-existed-route');
    expect(status).toEqual(404);
    expect(type).toEqual('application/json');
    expect(body).toEqual({ message: 'Not Found' });
  });
});
