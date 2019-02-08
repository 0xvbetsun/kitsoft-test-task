const {
  middlewares: { methodNotAllowed }
} = require('common');
const { ping } = require('./controller');

module.exports = router => {
  router
    .route('/test/ping')
    .get(ping)
    .all(methodNotAllowed);

  return router;
};
