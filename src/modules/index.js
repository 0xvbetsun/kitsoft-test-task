const { routes: systemRoutes } = require('system');
const { routes: docsRoutes } = require('docs');

module.exports = { routes: [systemRoutes, docsRoutes] };
