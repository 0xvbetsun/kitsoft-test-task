exports.responseTime = (req, res, next) => {
  res.locals.startedAt = process.hrtime();

  next();
};
