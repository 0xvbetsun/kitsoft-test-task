const fs = require('fs');
const path = require('path');
const {
  middlewares: { asyncHandler }
} = require('common');
const createError = require('http-errors');
const mime = require('mime-types');
const FileEcryptionService = require('./FileEncryptionService');
const { statAsync } = require('./utils');

const download = asyncHandler(async ({ params: { fileName } }, res, next) => {
  try {
    const filePath = `files/${fileName}`;
    await statAsync(filePath);

    const contentType = mime.contentType(path.extname(filePath));
    res.type(contentType).append('Content-Disposition', `attachment; filename=${fileName}`);

    const file = fs.createReadStream(filePath);
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
