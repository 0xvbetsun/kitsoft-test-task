const { createCipheriv, createDecipheriv } = require('crypto');
const config = require('config');

const algorithm = config.get('cipherAlgorithm');
const key = config.get('cipherKey');
const initVect = config.get('cipherIV');

class FileEcryptionService {
  static encrypt() {
    return createCipheriv(algorithm, key, initVect);
  }

  static decrypt() {
    return createDecipheriv(algorithm, key, initVect);
  }
}

module.exports = FileEcryptionService;
