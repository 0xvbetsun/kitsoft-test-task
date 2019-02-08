/* eslint-disable no-underscore-dangle, class-methods-use-this */
const fs = require('fs');
const FileEcryptionService = require('./FileEncryptionService');

const _destination = new WeakMap();
class StorageEngine {
  constructor(opts) {
    _destination.set(this, opts.destination || 'files');
  }

  get destination() {
    return _destination.get(this);
  }

  _handleFile(req, file, next) {
    const path = `./${this.destination}/${req.params.fileName}`;
    const outStream = fs.createWriteStream(path);
    file.stream.pipe(FileEcryptionService.encrypt()).pipe(outStream);
    outStream.on('error', next);
    outStream.on('finish', () => {
      next(null, {
        path,
        size: outStream.bytesWritten
      });
    });
  }

  _removeFile(req, file, next) {
    fs.unlink(file.path, next);
  }
}

module.exports = StorageEngine;
