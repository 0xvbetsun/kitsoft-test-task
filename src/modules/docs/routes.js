const { resolveRefs } = require('json-refs');
const { readFileSync } = require('fs');
const { join } = require('path');
const swaggerUi = require('swagger-ui-express');
const {
  middlewares: { methodNotAllowed }
} = require('common');
const swaggerDocument = require('./oas3/kitsoft.json');

const customCss = readFileSync(join(__dirname, 'theme.css'), 'utf-8');

module.exports = async router => {
  const result = await resolveRefs(swaggerDocument);
  await router
    .use('/doc', swaggerUi.serve)
    .get('/doc', swaggerUi.setup(result.resolved, { customCss }))
    .all('/doc', methodNotAllowed);

  return router;
};
