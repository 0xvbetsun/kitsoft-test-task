const {
  middlewares: { methodNotAllowed }
} = require('common');
const { upload, download } = require('./controller');
const { multipart } = require('./middleware');

module.exports = router => {
  router
    .get('/file/:fileName', download)
    .post('/file/:fileName', multipart.single('file'), upload)
    .all('/file/:fileName', methodNotAllowed);

  return router;
};
