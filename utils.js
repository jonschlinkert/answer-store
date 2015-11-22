'use strict';

/**
 * Utils
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;
require('write-json');
require('resolve-dir');
require('graceful-fs', 'gfs');
require('rimraf', 'del');
require = fn;

/**
 * Read a JSON file.
 *
 * @param {String} `fp`
 * @return {Object}
 */

utils.readJson = function(fp) {
  try {
    var str = utils.gfs.readFileSync(path.resolve(fp), 'utf8');
    return JSON.parse(str);
  } catch(err) {}
  return {};
};

/**
 * Expose `utils`
 */

module.exports = utils;
