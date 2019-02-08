const routes = require('./routes');
const { responseTime } = require('./middleware');

module.exports = { routes, middlewares: { responseTime } };
