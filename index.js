/*!
 * answer-store <https://github.com/jonschlinkert/answer-store>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var Emitter = require('component-emitter');
var set = require('set-value');
var get = require('get-value');
var utils = require('./utils');

function Answer(name, options) {
  if (typeof name !== 'string') {
    throw new TypeError('expected the first argument to be a string');
  }
  Emitter.call(this);
  this.entries = [];
  this.options = options || {};
  this.name = name;
  this.data = utils.readJson(this.path);
}

/**
 * Inherit Emitter
 */

Emitter(Answer.prototype);

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
  set(this.data, this.name, val);
  this.entry = val;
  this.emit('set', val);
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
  return get(this.data, this.name);
};

/**
 * Delete the answer store from disk.
 *
 * ```js
 * answer.del();
 * ```
 *
 * @api public
 */

Answer.prototype.del = function(cb) {
  this.erase();
  utils.del(this.path, {}, cb);
};

/**
 * Erase the answer from memory.
 *
 * ```js
 * answer.erase();
 * ```
 *
 * @api public
 */

Answer.prototype.erase = function() {
  this.set(null);
  return this;
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
  utils.writeJson(this.path, this.data);
  return this;
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
    var cwd = utils.resolveDir(this.options.cwd || '~/answers');
    return (this.paths.cwd = cwd);
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
    var fp = path.resolve(this.cwd, this.name + '.json');
    return (this.paths.path = fp);
  }
});

/**
 * Getter/setter for previous answer
 */

Object.defineProperty(Answer.prototype, 'entry', {
  set: function(val) {
    this.entries.push(val);
  },
  get: function() {
    return this.entries[this.entries.length - 1];
  }
});

/**
 * Expose `Answer`
 */

module.exports = Answer;
