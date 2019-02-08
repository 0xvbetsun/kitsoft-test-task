const request = require('request');

const redirect = (req, res) => {
  res.redirect(res.locals.url);
};

const proxy = (req, res) => {
  request(res.locals.url).pipe(res);
};

module.exports = { redirect, proxy };
