'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;

/**
 * Lazily required module dependencies
 */

require = utils;
require('write-json');
require('resolve-dir');
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
    var str = fs.readFileSync(path.resolve(fp), 'utf8');
    return JSON.parse(str);
  } catch(err) {}
  return {};
};

/**
 * Expose `utils`
 */

module.exports = utils;
