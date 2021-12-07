const { createHash } = require('crypto');

function hash256(string) {
  return createHash('sha256').update(string).digest('hex');
}

module.exports = hash256;