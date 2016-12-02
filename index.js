'use strict';

// In browsers, load the bundled version
module.exports = process.browser ? require('./dist/ptolemy') : require('./lib/ptolemy');
