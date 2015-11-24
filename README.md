# answer-store [![NPM version](https://badge.fury.io/js/answer-store.svg)](http://badge.fury.io/js/answer-store)  [![Build Status](https://travis-ci.org/jonschlinkert/answer-store.svg)](https://travis-ci.org/jonschlinkert/answer-store)

> Ask a question, store the answer.

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Related projects](#related-projects)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i answer-store --save
```

## Usage

```js
var answer = require('answer-store');
```

**What does this do?**

With project generators and build systems it's fairly common to prompt the user for information that is needed to complete the build or generate the project.

This library makes it easy to:

1. Persist the answers to the file system
2. Store values based on the current working directory
3. Store defaults that can be used regardless of the directory

**How this works**

* An answer is stored based on the current working directory, and the currently defined `locale`.
* A `default` answer may be defined for each `locale`

See the [API docs](#API) for information about setting and getting stores values.

**Example**

```js
var answer = new Answer('project-name');
answer.set('foo');
```

Results in the following object being written to `project-name.json` at `'/Users/jonschlinkert/answers/project-name.json'`:

```diff
{
  cache:
   { dest: '/Users/jonschlinkert/answers',
+     path: '/Users/jonschlinkert/answers/project-name.json',
     cwd: '/Users/jonschlinkert/dev/answer-store' },
  options: {},
  name: 'project-name',
  data: { 
    en: { 
      '/Users/jonschlinkert/dev/answer-store': 'foo' 
    }
  }
}
```

**locales**

If the question has been answered for multiple locales, the object would something like this:

```diff
{
  cache:
   { dest: '/Users/jonschlinkert/answers',
     path: '/Users/jonschlinkert/answers/project-name.json',
     cwd: '/Users/jonschlinkert/dev/answer-store' },
  options: {},
  name: 'project-name',
+  data: { 
+    en: { '/Users/jonschlinkert/dev/answer-store': 'foo' },
+    es: { '/Users/jonschlinkert/dev/answer-store': 'bar' },
+    fr: { '/Users/jonschlinkert/dev/answer-store': 'baz' }
+  }
}
```

**directories**

When the question has been answered from different directories, the object might look something like this:

```diff
{
  cache:
   { dest: '/Users/jonschlinkert/answers',
     path: '/Users/jonschlinkert/answers/project-name.json',
     cwd: '/Users/jonschlinkert/dev/answer-store' },
  options: {},
  name: 'project-name',
  data: { 
+    en: { 
+      '/Users/jonschlinkert/dev/answer-store/1': 'foo1',
+      '/Users/jonschlinkert/dev/answer-store/2': 'foo2',
+      '/Users/jonschlinkert/dev/answer-store/3': 'foo3' 
+    }
  }
}
```

**defaults**

A default value may be stored for each locale:

```diff
{
  cache:
   { dest: '/Users/jonschlinkert/answers',
     path: '/Users/jonschlinkert/answers/project-name.json',
     cwd: '/Users/jonschlinkert/dev/answer-store' },
  options: {},
  name: 'project-name',
  data: { 
+    default: 'foo',
    en: { 
      '/Users/jonschlinkert/dev/answer-store/1': 'foo1',
      '/Users/jonschlinkert/dev/answer-store/2': 'foo2',
      '/Users/jonschlinkert/dev/answer-store/3': 'foo3' 
    }
  }
}
```

## API

### [Answer](index.js#L21)

Create new `Answer` store `name`, with the given `options`.

**Params**

* `name` **{String}**: The answer property name.
* `options` **{Object}**: Store options

### [.set](index.js#L42)

Store the specified `value` for the current (or given) local, at the current cwd.

**Params**

* `value` **{any}**: The answer value.
* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.set('foo');
```

### [.get](index.js#L58)

Get the stored answer for the current (or given) `locale` at the current `cwd`.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.get(locale);
```

### [.has](index.js#L73)

Return true if an answer has been stored for the current (or given) locale at the working directory.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.has('foo');
```

### [.setDefault](index.js#L87)

Set the default answer for the currently defined `locale`.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.setDefault('foo');
```

### [.getDefault](index.js#L103)

Get the default answer for the currently defined `locale`.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.getDefault();
```

### [.hasDefault](index.js#L117)

Return true if a value is stored for the current (or given) locale, at the current cwd.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.hasDefault(locale);
```

### [.deleteDefault](index.js#L131)

Delete the stored values for the current (or given) locale.

**Params**

* `locale` **{String}**: Optionally pass the local to delete.

**Example**

```js
answer.deleteDefault(locale);
```

### [.del](index.js#L146)

Delete the stored values for the current (or given) locale, at the current cwd.

**Params**

* `locale` **{String}**: Optionally pass the local to delete.

**Example**

```js
answer.del(locale);
```

### [.erase](index.js#L160)

Erase all stored values and delete the answer store from the file system.

**Example**

```js
answer.del();
```

## Related projects

* [ask-once](https://www.npmjs.com/package/ask-once): Only ask a question one time and store the answer. | [homepage](https://github.com/doowb/ask-once)
* [question-cache](https://www.npmjs.com/package/question-cache): A wrapper around inquirer that makes it easy to create and selectively reuse questions. | [homepage](https://github.com/jonschlinkert/question-cache)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/answer-store/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 24, 2015._