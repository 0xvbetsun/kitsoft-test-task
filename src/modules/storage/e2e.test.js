/* eslint-disable consistent-return, array-callback-return */
const request = require('supertest');
const { readdirAsync, statAsync, unlinkAsync } = require('./utils');
const app = require('../../../src/app');

const testImage = `${__dirname}/__fixtures__/test-image.jpg`;
const clearFileStorage = async (directory = 'files') => {
  try {
    const files = await readdirAsync(directory);
    const unlinkPromises = files.map(filename => {
      if (filename.charAt(0) !== '.') {
        return unlinkAsync(`${directory}/${filename}`);
      }
    });
    return await Promise.all(unlinkPromises);
  } catch (err) {
    console.error(err);
  }
};
beforeAll(async () => {
  await clearFileStorage();
});

afterAll(async () => {
  await clearFileStorage();
});
describe('Test the "Storage" endpoints', () => {
  test('Successful File Upload', async () => {
    const { status } = await request(app)
      .post('/api/file/file-name.jpg')
      .attach('file', testImage, { contentType: 'multipart/form-data' });
    const fileStat = await statAsync('files/file-name.jpg');

    expect(status).toEqual(204);
    expect(fileStat.isFile()).toBeTruthy();
  });

  test('Successful File Download', async () => {
    const { status } = await request(app).get('/api/file/file-name.jpg');
    expect(status).toEqual(200);
  });

  test('Restricted not allowed methods', async () => {
    const { status, type, body } = await request(app).put('/api/file/file-name.jpg');
    expect(status).toEqual(405);
    expect(type).toEqual('application/json');
    expect(body).toEqual({ message: 'Method Not Allowed' });
  });
});
