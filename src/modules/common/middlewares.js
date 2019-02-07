/**
 * @module Common/Middlewares
 */
const createError = require('http-errors');

/**
 * Universal error catcher for async/await based middlewares
 * @function
 * @param {Function} fn - Express middleware
 * @memberof Common/Middlewares
 */
const asyncHandler = fn => (...args) => {
  const fnReturn = fn(...args);
  const next = args[args.length - 1];
  return Promise.resolve(fnReturn).catch(next);
};

/**
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Function|undefined}
 * @memberof Common/Middlewares
 */
const methodNotAllowed = (req, res, next) => {
  return next(createError(405));
};

/**
 * @function
 * @param {Object} err - Express error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * @memberof Common/Middlewares
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  const { message, status } = err;
  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(status || 500).json({ message });
};

module.exports = { asyncHandler, methodNotAllowed, errorHandler };
