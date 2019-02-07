const fs = require('fs');
const {
  middlewares: { asyncHandler }
} = require('common');
const createError = require('http-errors');
const FileEcryptionService = require('./FileEncryptionService');
const { statAsync } = require('./utils');

const download = asyncHandler(async ({ params: { fileName } }, res, next) => {
  try {
    const path = `files/${fileName}`;
    await statAsync(path);
    const file = fs.createReadStream(path);
    file.pipe(FileEcryptionService.decrypt()).pipe(res);
  } catch (err) {
    if (err.code === 'ENOENT') {
      next(createError(404, 'Requested file does not exists. Please recheck query params.'));
    } else {
      next(err);
    }
  }
});

const upload = (req, res) => {
  res.status(204).end();
};

module.exports = { download, upload };
