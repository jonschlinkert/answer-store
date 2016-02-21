# answer-store [![NPM version](https://img.shields.io/npm/v/answer-store.svg)](https://www.npmjs.com/package/answer-store) [![Build Status](https://img.shields.io/travis/jonschlinkert/answer-store.svg)](https://travis-ci.org/jonschlinkert/answer-store)

> Store answers to user prompts, based on locale and/or current working directory.

## TOC

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Related projects](#related-projects)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install

Install with [npm](https://www.npmjs.com/):

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

**What else?**

Module dependencies are lazily required, so initialization is fast!

## API

### [Answer](index.js#L21)

Create new `Answer` store `name`, with the given `options`.

**Params**

* `name` **{String}**: The answer property name.
* `options` **{Object}**: Store options

### [.set](index.js#L55)

Store the specified `value` for the current (or given) local, at the current cwd.

**Params**

* `value` **{any}**: The answer value.
* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.set('foo');
```

### [.get](index.js#L71)

Get the stored answer for the current (or given) `locale` at the current `cwd`.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.get(locale);
```

### [.has](index.js#L86)

Return true if an answer has been stored for the current (or given) locale at the working directory.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.has('foo');
```

### [.del](index.js#L100)

Delete the stored values for the current (or given) locale, at the current cwd.

**Params**

* `locale` **{String}**: Optionally pass the local to delete.

**Example**

```js
answer.del(locale);
```

### [.erase](index.js#L115)

Erase all stored values and delete the answer store from the file system.

**Example**

```js
answer.erase();
```

### [.setDefault](index.js#L131)

Set the default answer for the currently defined `locale`.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.setDefault('foo');
```

### [.getDefault](index.js#L147)

Get the default answer for the currently defined `locale`.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.getDefault();
```

### [.hasDefault](index.js#L161)

Return true if a value is stored for the current (or given) locale, at the current cwd.

**Params**

* `locale` **{String}**: Optionally pass the locale to use, otherwise the default locale is used.

**Example**

```js
answer.hasDefault(locale);
```

### [.delDefault](index.js#L175)

Delete the stored values for the current (or given) locale.

**Params**

* `locale` **{String}**: Optionally pass the local to delete.

**Example**

```js
answer.delDefault(locale);
```

## Related projects

* [ask-once](https://www.npmjs.com/package/ask-once): Only ask a question one time and store the answer. | [homepage](https://github.com/doowb/ask-once)
* [common-questions](https://www.npmjs.com/package/common-questions): An object of questions commonly used by project generators or when initializing projects. Questions can… [more](https://www.npmjs.com/package/common-questions) | [homepage](https://github.com/generate/common-questions)
* [question-cache](https://www.npmjs.com/package/question-cache): A wrapper around inquirer that makes it easy to create and selectively reuse questions. | [homepage](https://github.com/jonschlinkert/question-cache)
* [question-store](https://www.npmjs.com/package/question-store): Ask questions, persist the answers. Basic support for i18n and storing answers based on current… [more](https://www.npmjs.com/package/question-store) | [homepage](https://github.com/jonschlinkert/question-store)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/answer-store/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm i -d && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/jonschlinkert/answer-store/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on February 21, 2016._