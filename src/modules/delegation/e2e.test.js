const request = require('supertest');
const app = require('../../../src/app');

describe('Test the "Delegation" endpoints', () => {
  test('Successful redirection to "https://www.google.com"', async () => {
    const { status, type, redirect } = await request(app).get('/api/redirect/https://www.google.com');
    expect(status).toEqual(302);
    expect(type).toEqual('text/plain');
    expect(redirect).toBeTruthy();
  });

  test('Restrict redirection to invalid URL', async () => {
    const { status, type, body } = await request(app).get('/api/redirect/invalid-url');
    expect(status).toEqual(422);
    expect(type).toEqual('application/json');
    expect(body.message).toEqual('Passed URL is not correct. Please recheck query string.');
  });

  test('Successful proxy from "https://www.google.com"', async () => {
    const { status, type, redirect } = await request(app).get('/api/proxy/https://www.google.com');
    expect(status).toEqual(200);
    expect(type).toEqual('text/html');
    expect(redirect).toBeFalsy();
  });

  test('Restrict proxy from invalid URL', async () => {
    const { status, type, body } = await request(app).get('/api/proxy/invalid-url');
    expect(status).toEqual(422);
    expect(type).toEqual('application/json');
    expect(body.message).toEqual('Passed URL is not correct. Please recheck query string.');
  });
});
