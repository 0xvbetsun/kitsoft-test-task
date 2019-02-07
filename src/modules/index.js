const { routes: systemRoutes } = require('system');
const { routes: docsRoutes } = require('docs');
const { routes: storageRoutes } = require('storage');

module.exports = { routes: [systemRoutes, docsRoutes, storageRoutes] };
