const multer = require('multer');
const fs = require('fs');
const util = require('util');
const createError = require('http-errors');
const mime = require('mime-types');
const StorageEngine = require('./StorageEngine');

const statAsync = util.promisify(fs.stat);

const limits = {
  files: 1,
  fileSize: 1024 * 1024 * 15 // 15 MB (max file size)
};

const fileFilter = async (req, file, next) => {
  const ext = mime.extension(file.mimetype);
  // eslint-disable-next-line no-param-reassign
  file.ext = ext;
  try {
    const fileStat = await statAsync(`files/${req.params.fileName}.${ext}`);
    if (fileStat.isFile()) {
      next(createError(409, 'File with the same name already exists.'));
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      next(null, true);
    } else {
      next(err);
    }
  }
};

const storage = new StorageEngine({ destination: 'files' });

exports.multipart = multer({ storage, limits, fileFilter });
