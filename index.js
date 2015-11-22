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
  this.options = options || {};
  this.name = name;
  this.data = utils.readJson(this.path);
  this.data.rollback = this.data.rollback || [];
  this.data.entries = this.data.entries || [];
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
  this.data.entries.push(val);
  this.emit('set', val);
  this.save();
  return this;
};

/**
 * Remove the last answer.
 *
 * ```js
 * answer.undo();
 * ```
 *
 * @api public
 */

Answer.prototype.undo = function() {
  if (this.len) {
    this.data.rollback.push(this.data.entries.pop());
    this.save();
  }
  return this;
};

Answer.prototype.redo = function() {
  if (this.data.rollback.length) {
    this.data.entries.push(this.data.rollback.pop());
    this.save();
  }
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
  return this.data.entries[this.len - 1];
};

Answer.prototype.backup = function() {
  this.data.rollback = this.data.rollback.concat(this.data.entries);
  return this;
};

/**
 * Get a previous answer.
 *
 * ```js
 * answer.prev(2);
 * ```
 *
 * @api public
 */

Answer.prototype.prev = function(n) {
  return this.data.entries[this.len - (n && n > 0 ? n + 1 : 1)];
};

Answer.prototype.list = function() {
  return this.data.entries;
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
  this.backup();
  this.data.entries = [];
  utils.del(this.path, {}, cb);
};

Answer.prototype.destroy = function(cb) {
  this.data.rollback = [];
  this.data.entries = [];
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
  this.data.entries.pop();
  this.save();
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
  utils.writeJson.sync(this.path, this.data);
};

/**
 * Get the number of entries.
 */

Object.defineProperty(Answer.prototype, 'current', {
  enumerable: true,
  set: function() {
    throw new Error('current is a getter and may not be overwritten.');
  },
  get: function() {
    return this.data.entries[this.len - 1];
  }
});

/**
 * Get the number of entries.
 */

Object.defineProperty(Answer.prototype, 'len', {
  set: function() {
    throw new Error('len is a getter and may not be overwritten.');
  },
  get: function() {
    return this.data.entries.length;
  }
});

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
 * Expose `Answer`
 */

module.exports = Answer;
