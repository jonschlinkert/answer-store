/*!
 * answer-store <https://github.com/jonschlinkert/answer-store>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var set = require('set-value');
var get = require('get-value');
var utils = require('./utils');

/**
 * Create new `Answer` store `name`, with the given `options`.
 *
 * @param {String} `key` The answer key
 * @param {Object} `options` Store options
 * @api public
 */

function Answer(key, options) {
  if (typeof key !== 'string') {
    throw new TypeError('expected the first argument to be a string');
  }
  this.options = options || {};
  this.name = key;
  this.data = utils.readJson(this.path);
}

/**
 * Non-emumerable paths cache
 */

Answer.prototype.paths = {};

/**
 * Update the answer.
 *
 * ```js
 * answer.set('foo');
 * ```
 *
 * @api public
 */

Answer.prototype.set = function(val) {
  set(this.data, [this.name, this.cwd], val);
  this.save();
  return this;
};

/**
 * Get the answer.
 *
 * ```js
 * answer.get();
 * ```
 *
 * @api public
 */

Answer.prototype.get = function() {
  return get(this.data, [this.name, this.cwd]);
};

/**
 * Delete the entire answer store.
 *
 * ```js
 * answer.del();
 * ```
 * @param {Function} `callback`
 * @api public
 */

Answer.prototype.del = function() {
  this.data[this.name] = null;
  utils.del.sync(this.path);
};

/**
 * Persist the answer to disk.
 *
 * ```js
 * answer.save();
 * ```
 *
 * @api public
 */

Answer.prototype.save = function() {
  utils.writeJson.sync(this.path, this.data);
};

/**
 * Getter/setter for answer cwd
 */

Object.defineProperty(Answer.prototype, 'cwd', {
  set: function(cwd) {
    this.paths.cwd = cwd;
  },
  get: function() {
    if (this.paths.hasOwnProperty('cwd')) {
      return this.paths.cwd;
    }
    var cwd = path.resolve(this.options.cwd || process.cwd());
    return (this.paths.cwd = cwd);
  }
});

/**
 * Getter/setter for answer dest
 */

Object.defineProperty(Answer.prototype, 'dest', {
  set: function(dest) {
    this.paths.dest = dest;
  },
  get: function() {
    if (this.paths.hasOwnProperty('dest')) {
      return this.paths.dest;
    }
    var dest = utils.resolveDir(this.options.dest || '~/answers');
    return (this.paths.dest = dest);
  }
});

/**
 * Getter/setter for answer path
 */

Object.defineProperty(Answer.prototype, 'path', {
  set: function(fp) {
    this.paths.path = fp;
  },
  get: function() {
    if (this.paths.hasOwnProperty('path')) {
      return this.paths.path;
    }
    var fp = path.resolve(this.dest, this.name + '.json');
    return (this.paths.path = fp);
  }
});

/**
 * Expose `Answer`
 */

module.exports = Answer;
