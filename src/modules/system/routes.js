const {
  middlewares: { methodNotAllowed }
} = require('common');
const { ping } = require('./controller');

module.exports = router => {
  router.get('/test/ping', ping).all('/test/ping', methodNotAllowed);

  return router;
};
