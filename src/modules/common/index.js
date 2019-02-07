/**
 * @module Common
 */
const { asyncHandler, methodNotAllowed, errorHandler } = require('./middlewares');

module.exports = { middlewares: { asyncHandler, methodNotAllowed, errorHandler } };
