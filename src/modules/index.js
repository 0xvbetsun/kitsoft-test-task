const { routes: systemRoutes } = require('system');
const { routes: storageRoutes } = require('storage');
const { routes: delegationRoutes } = require('delegation');
const { routes: docsRoutes } = require('docs');

module.exports = { routes: [systemRoutes, delegationRoutes, storageRoutes, docsRoutes] };
