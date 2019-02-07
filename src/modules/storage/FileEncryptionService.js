const crypto = require('crypto');
const zlib = require('zlib');

const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';

class FileEcryptionService {
  static encrypt() {
    return crypto.createCipher(algorithm, password);
  }

  static decrypt() {
    return crypto.createDecipher(algorithm, password);
  }
}

module.exports = FileEcryptionService;
