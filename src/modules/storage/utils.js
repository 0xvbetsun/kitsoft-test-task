const fs = require('fs');
const { promisify } = require('util');

exports.statAsync = promisify(fs.stat);
