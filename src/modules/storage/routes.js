const {
  middlewares: { methodNotAllowed }
} = require('common');
const { upload, download } = require('./controller');
const { multipart, fileNameValidator } = require('./middleware');

module.exports = router => {
  router.param('fileName', fileNameValidator);
  router
    .route('/file/:fileName')
    .get(download)
    .post(multipart.single('file'), upload)
    .all(methodNotAllowed);

  return router;
};
