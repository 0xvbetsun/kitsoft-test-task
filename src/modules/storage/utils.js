const fs = require('fs');
const { promisify } = require('util');

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const unlinkAsync = promisify(fs.unlink);

module.exports = { readdirAsync, statAsync, unlinkAsync };
