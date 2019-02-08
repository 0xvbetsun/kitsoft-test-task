const multer = require('multer');
const createError = require('http-errors');
const StorageEngine = require('./StorageEngine');
const { statAsync } = require('./utils');

/**
 * @param {string} fileName - file name, received from client
 * @param {Function} next - Express next middleware function
 * @returns {Promise}
 */
const validateFileConflicts = async (fileName, next) => {
  const fileStat = await statAsync(`files/${fileName}`);

  if (fileStat.isFile()) {
    next(createError(409, 'File with the same name already exists.'));
  }
};

const storage = new StorageEngine({ destination: 'files' });

const limits = {
  files: 1,
  fileSize: 1024 * 1024 * 150 // 150 MB (max file size)
};

/**
 * File filtration middleware
 * @function
 * @param {Object} req - Express request object
 * @param {Object} file - Multer file object
 * @param {Function} next - Express next middleware function
 * @returns {Promise}
 */
const fileFilter = async ({ params: { fileName } }, file, next) => {
  try {
    await validateFileConflicts(fileName, next);
  } catch (err) {
    if (err.code === 'ENOENT') {
      next(null, true);
    } else {
      next(err);
    }
  }
};

const multipart = multer({ storage, limits, fileFilter });

/**
 * Middleware for file name validation
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const fileNameValidator = ({ params: { fileName } }, res, next) => {
  const ext = fileName.split('.').pop();

  if (ext === fileName) {
    next(createError(422, 'Name of file without extension. Please recheck query string.'));
  }
  next();
};

module.exports = { multipart, fileNameValidator };
