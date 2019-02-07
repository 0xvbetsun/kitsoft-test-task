const { readFileSync } = require('fs');
const { join } = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {
  middlewares: { methodNotAllowed }
} = require('common');

const swaggerDocument = YAML.load(join(__dirname, 'kitsoft-oas3.yaml'));
const styles = readFileSync(join(__dirname, 'theme.css'), 'utf-8');

const options = { customCss: styles };

module.exports = router => {
  router
    .use('/doc', swaggerUi.serve)
    .get('/doc', swaggerUi.setup(swaggerDocument, options))
    .all('/doc', methodNotAllowed);

  return router;
};
