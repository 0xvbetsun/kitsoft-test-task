const { redirect, proxy } = require('./controller');
const { urlValidator } = require('./middleware');

module.exports = router => {
  router.all('/redirect/*', urlValidator, redirect);
  router.all('/proxy/*', urlValidator, proxy);

  return router;
};
