const createError = require('http-errors');
/**
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
exports.urlValidator = (req, res, next) => {
  const url = req.params[0];
  res.locals.url = url;
  const pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

  if (!pattern.test(url)) {
    next(createError(422, 'Passed URL is not correct. Please recheck query string.'));
  } else {
    next();
  }
};
