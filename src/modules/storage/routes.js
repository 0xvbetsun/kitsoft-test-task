const {
  middlewares: { methodNotAllowed }
} = require('common');
const { upload, download } = require('./controller');
const { multipart, extensionValidator } = require('./middleware');

module.exports = router => {
  router
    .get('/file/:fileName', extensionValidator, download)
    .post('/file/:fileName', extensionValidator, multipart.single('file'), upload)
    .all('/file/:fileName', methodNotAllowed);

  return router;
};
