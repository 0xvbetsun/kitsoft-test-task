const createError = require('http-errors');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const {
  middlewares: { errorHandler }
} = require('common');
const {
  middlewares: { responseTime }
} = require('system');
const { routes } = require('./modules');

const app = express();

/**
 * Enable middlewares
 */
app.use(responseTime);
if (app.get('env') !== 'production') {
  app.use(logger('dev'));
}
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Configure routes
 * TODO: async handler for doc route
 */
const apiRouter = express.Router();
routes.forEach(connectModule => connectModule(apiRouter));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
