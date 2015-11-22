'use strict';

var path = require('path');
var timestamp = require('time-stamp');
var utils = require('./utils');

function History(name, options) {
  if (typeof name !== 'string') {
    throw new TypeError('expected the first argument to be a string');
  }

  this.options = options || {};
  var cwd = utils.resolveDir(this.options.cwd || '~/history');

  this.name = name;
  this.keep = this.options.keep || 50;
  this.root = path.resolve(cwd, name + '.json');
  // this.data =
  this.entries = utils.readJson(this.path);
}

History.prototype.snapshot = function() {
  return
};

// discard specific entries
History.prototype.discard = function() {
  return
};

// rollback to the previous value and
// delete the last entry
History.prototype.undo = function() {
  return
};

History.prototype.prev = function(n) {
  return this.entries.slice(-n);
};

History.prototype.entry = function(val) {
  return new Entry(val);
};

/**
 * Persist an entry to disk.
 *
 * ```js
 * history.record();
 * ```
 *
 * @api public
 */

History.prototype.record = function(val) {
  utils.writeJson(this.path, this.entry(val));
  return this;
};

Object.defineProperty(History.prototype, 'path', {
  set: function() {
    throw new Error('path is a getter and may not be defined');
  },
  get: function() {
    var time = timestamp('YYYY/MM/DD/HH/mm/ss/ms');
    var file = path.join(this.cwd, time);
    this.entries.push(file);
    return file;
  }
});

Object.defineProperty(History.prototype, 'last', {
  set: function() {
    throw new Error('last is a getter and may not be defined');
  },
  get: function() {
    return this.entries[this.entries.length - 1];
  }
});

Object.defineProperty(History.prototype, 'first', {
  set: function() {
    throw new Error('first is a getter and may not be defined');
  },
  get: function() {
    return this.entries[0];
  }
});

/**
 * Expose `History`
 */

module.exports = History;

function Entry(value) {
  this.created = new Date();
  this.value = value;
}

// var history = new History('name', {
//   cwd: 'fixtures'
// });

// console.log(history)
// console.log(new Date())
