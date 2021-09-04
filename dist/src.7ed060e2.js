// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/common/fonts.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../../static/fonts/manu-chat.eot":[["manu-chat.adaf73ac.eot","fonts/manu-chat.eot"],"fonts/manu-chat.eot"],"./../../static/fonts/manu-chat.ttf":[["manu-chat.a924c81e.ttf","fonts/manu-chat.ttf"],"fonts/manu-chat.ttf"],"./../../static/fonts/manu-chat.woff":[["manu-chat.94d6d32d.woff","fonts/manu-chat.woff"],"fonts/manu-chat.woff"],"./../../static/fonts/manu-chat.svg":[["manu-chat.069feb62.svg","fonts/manu-chat.svg"],"fonts/manu-chat.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/common/common.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./fonts.pcss":"../src/common/fonts.pcss","./../../static/images/background.svg":[["background.1afa1296.svg","images/background.svg"],"images/background.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/buttons/buttons.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/inputs/inputs.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/headings/headings.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/avatar/avatar.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/profile-field/profile-field.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/chat-list-profile-card/chat-list-profile-card.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/modules/user-profile-form/user-profile-form.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/chats/login/login.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/chats/register/register.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/chats/main/main.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/chats/user-profile/user-profile.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/style.pcss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"../src/common/common.pcss":"../src/common/common.pcss","../src/components/buttons/buttons.pcss":"../src/components/buttons/buttons.pcss","../src/components/inputs/inputs.pcss":"../src/components/inputs/inputs.pcss","../src/components/headings/headings.pcss":"../src/components/headings/headings.pcss","../src/components/avatar/avatar.pcss":"../src/components/avatar/avatar.pcss","../src/components/profile-field/profile-field.pcss":"../src/components/profile-field/profile-field.pcss","../src/modules/chat-list-profile-card/chat-list-profile-card.pcss":"../src/modules/chat-list-profile-card/chat-list-profile-card.pcss","../src/modules/user-profile-form/user-profile-form.pcss":"../src/modules/user-profile-form/user-profile-form.pcss","../src/pages/chats/login/login.pcss":"../src/pages/chats/login/login.pcss","../src/pages/chats/register/register.pcss":"../src/pages/chats/register/register.pcss","../src/pages/chats/main/main.pcss":"../src/pages/chats/main/main.pcss","../src/pages/chats/user-profile/user-profile.pcss":"../src/pages/chats/user-profile/user-profile.pcss","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/handlebars/dist/handlebars.runtime.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["Handlebars"] = factory();else root["Handlebars"] = factory();
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)

        /******/

        var module = installedModules[moduleId] = {
          /******/
          exports: {},

          /******/
          id: moduleId,

          /******/
          loaded: false
          /******/

        };
        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        // Flag the module as loaded

        /******/

        module.loaded = true;
        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/
      // __webpack_public_path__

      /******/

      __webpack_require__.p = "";
      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(0);
      /******/
    }([
      /* 0 */

      /***/

      /* 1 */

      /***/

      /* 2 */

      /***/

      /* 3 */

      /***/

      /* 4 */

      /***/

      /* 5 */

      /***/

      /* 6 */

      /***/

      /* 7 */

      /***/

      /* 8 */

      /***/

      /* 9 */

      /***/

      /* 10 */

      /***/

      /* 11 */

      /***/

      /* 12 */

      /***/

      /* 13 */

      /***/

      /* 14 */

      /***/

      /* 15 */

      /***/

      /* 16 */

      /***/

      /* 17 */

      /***/

      /* 18 */

      /***/

      /* 19 */

      /***/

      /* 20 */

      /***/

      /* 21 */

      /***/

      /* 22 */

      /***/

      /* 23 */

      /***/

      /* 24 */

      /***/

      /* 25 */

      /***/

      /* 26 */

      /***/

      /* 27 */

      /***/

      /* 28 */

      /***/

      /* 29 */

      /***/

      /* 30 */

      /***/

      /* 31 */

      /***/

      /* 32 */

      /***/

      /* 33 */

      /***/

      /* 34 */

      /***/

      /* 35 */

      /***/

      /* 36 */

      /***/

      /* 37 */

      /***/

      /* 38 */

      /***/

      /* 39 */

      /***/

      /* 40 */

      /***/

      /* 41 */

      /***/

      /* 42 */

      /***/

      /* 43 */

      /***/

      /******/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _handlebarsBase = __webpack_require__(3);

      var base = _interopRequireWildcard(_handlebarsBase); // Each of these augment the Handlebars object. No need to setup here.
      // (This is done to easily share code between commonjs and browse envs)


      var _handlebarsSafeString = __webpack_require__(36);

      var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

      var _handlebarsException = __webpack_require__(5);

      var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

      var _handlebarsUtils = __webpack_require__(4);

      var Utils = _interopRequireWildcard(_handlebarsUtils);

      var _handlebarsRuntime = __webpack_require__(37);

      var runtime = _interopRequireWildcard(_handlebarsRuntime);

      var _handlebarsNoConflict = __webpack_require__(43);

      var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict); // For compatibility and usage outside of module systems, make the Handlebars object a namespace


      function create() {
        var hb = new base.HandlebarsEnvironment();
        Utils.extend(hb, base);
        hb.SafeString = _handlebarsSafeString2['default'];
        hb.Exception = _handlebarsException2['default'];
        hb.Utils = Utils;
        hb.escapeExpression = Utils.escapeExpression;
        hb.VM = runtime;

        hb.template = function (spec) {
          return runtime.template(spec, hb);
        };

        return hb;
      }

      var inst = create();
      inst.create = create;

      _handlebarsNoConflict2['default'](inst);

      inst['default'] = inst;
      exports['default'] = inst;
      module.exports = exports['default'];
      /***/
    }, function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};

          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }

          newObj["default"] = obj;
          return newObj;
        }
      };

      exports.__esModule = true;
      /***/
    }, function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      };

      exports.__esModule = true;
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.HandlebarsEnvironment = HandlebarsEnvironment;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      var _helpers = __webpack_require__(9);

      var _decorators = __webpack_require__(29);

      var _logger = __webpack_require__(31);

      var _logger2 = _interopRequireDefault(_logger);

      var _internalProtoAccess = __webpack_require__(32);

      var VERSION = '4.7.7';
      exports.VERSION = VERSION;
      var COMPILER_REVISION = 8;
      exports.COMPILER_REVISION = COMPILER_REVISION;
      var LAST_COMPATIBLE_COMPILER_REVISION = 7;
      exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
      var REVISION_CHANGES = {
        1: '<= 1.0.rc.2',
        // 1.0.rc.2 is actually rev2 but doesn't report it
        2: '== 1.0.0-rc.3',
        3: '== 1.0.0-rc.4',
        4: '== 1.x.x',
        5: '== 2.0.0-alpha.x',
        6: '>= 2.0.0-beta.1',
        7: '>= 4.0.0 <4.3.0',
        8: '>= 4.3.0'
      };
      exports.REVISION_CHANGES = REVISION_CHANGES;
      var objectType = '[object Object]';

      function HandlebarsEnvironment(helpers, partials, decorators) {
        this.helpers = helpers || {};
        this.partials = partials || {};
        this.decorators = decorators || {};

        _helpers.registerDefaultHelpers(this);

        _decorators.registerDefaultDecorators(this);
      }

      HandlebarsEnvironment.prototype = {
        constructor: HandlebarsEnvironment,
        logger: _logger2['default'],
        log: _logger2['default'].log,
        registerHelper: function registerHelper(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple helpers');
            }

            _utils.extend(this.helpers, name);
          } else {
            this.helpers[name] = fn;
          }
        },
        unregisterHelper: function unregisterHelper(name) {
          delete this.helpers[name];
        },
        registerPartial: function registerPartial(name, partial) {
          if (_utils.toString.call(name) === objectType) {
            _utils.extend(this.partials, name);
          } else {
            if (typeof partial === 'undefined') {
              throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
            }

            this.partials[name] = partial;
          }
        },
        unregisterPartial: function unregisterPartial(name) {
          delete this.partials[name];
        },
        registerDecorator: function registerDecorator(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple decorators');
            }

            _utils.extend(this.decorators, name);
          } else {
            this.decorators[name] = fn;
          }
        },
        unregisterDecorator: function unregisterDecorator(name) {
          delete this.decorators[name];
        },

        /**
         * Reset the memory of illegal property accesses that have already been logged.
         * @deprecated should only be used in handlebars test-cases
         */
        resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
          _internalProtoAccess.resetLoggedProperties();
        }
      };
      var log = _logger2['default'].log;
      exports.log = log;
      exports.createFrame = _utils.createFrame;
      exports.logger = _logger2['default'];
      /***/
    }, function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.extend = extend;
      exports.indexOf = indexOf;
      exports.escapeExpression = escapeExpression;
      exports.isEmpty = isEmpty;
      exports.createFrame = createFrame;
      exports.blockParams = blockParams;
      exports.appendContextPath = appendContextPath;
      var escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      var badChars = /[&<>"'`=]/g,
          possible = /[&<>"'`=]/;

      function escapeChar(chr) {
        return escape[chr];
      }

      function extend(obj
      /* , ...source */
      ) {
        for (var i = 1; i < arguments.length; i++) {
          for (var key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              obj[key] = arguments[i][key];
            }
          }
        }

        return obj;
      }

      var toString = Object.prototype.toString;
      exports.toString = toString; // Sourced from lodash
      // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt

      /* eslint-disable func-style */

      var isFunction = function isFunction(value) {
        return typeof value === 'function';
      }; // fallback for older versions of Chrome and Safari

      /* istanbul ignore next */


      if (isFunction(/x/)) {
        exports.isFunction = isFunction = function (value) {
          return typeof value === 'function' && toString.call(value) === '[object Function]';
        };
      }

      exports.isFunction = isFunction;
      /* eslint-enable func-style */

      /* istanbul ignore next */

      var isArray = Array.isArray || function (value) {
        return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
      };

      exports.isArray = isArray; // Older IE versions do not directly support indexOf so we must implement our own, sadly.

      function indexOf(array, value) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (array[i] === value) {
            return i;
          }
        }

        return -1;
      }

      function escapeExpression(string) {
        if (typeof string !== 'string') {
          // don't escape SafeStrings, since they're already safe
          if (string && string.toHTML) {
            return string.toHTML();
          } else if (string == null) {
            return '';
          } else if (!string) {
            return string + '';
          } // Force a string conversion as this will be done by the append regardless and
          // the regex test will do this transparently behind the scenes, causing issues if
          // an object's to string has escaped characters in it.


          string = '' + string;
        }

        if (!possible.test(string)) {
          return string;
        }

        return string.replace(badChars, escapeChar);
      }

      function isEmpty(value) {
        if (!value && value !== 0) {
          return true;
        } else if (isArray(value) && value.length === 0) {
          return true;
        } else {
          return false;
        }
      }

      function createFrame(object) {
        var frame = extend({}, object);
        frame._parent = object;
        return frame;
      }

      function blockParams(params, ids) {
        params.path = ids;
        return params;
      }

      function appendContextPath(contextPath, id) {
        return (contextPath ? contextPath + '.' : '') + id;
      }
      /***/

    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$defineProperty = __webpack_require__(6)['default'];

      exports.__esModule = true;
      var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

      function Exception(message, node) {
        var loc = node && node.loc,
            line = undefined,
            endLineNumber = undefined,
            column = undefined,
            endColumn = undefined;

        if (loc) {
          line = loc.start.line;
          endLineNumber = loc.end.line;
          column = loc.start.column;
          endColumn = loc.end.column;
          message += ' - ' + line + ':' + column;
        }

        var tmp = Error.prototype.constructor.call(this, message); // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.

        for (var idx = 0; idx < errorProps.length; idx++) {
          this[errorProps[idx]] = tmp[errorProps[idx]];
        }
        /* istanbul ignore else */


        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, Exception);
        }

        try {
          if (loc) {
            this.lineNumber = line;
            this.endLineNumber = endLineNumber; // Work around issue under safari where we can't directly set the column value

            /* istanbul ignore next */

            if (_Object$defineProperty) {
              Object.defineProperty(this, 'column', {
                value: column,
                enumerable: true
              });
              Object.defineProperty(this, 'endColumn', {
                value: endColumn,
                enumerable: true
              });
            } else {
              this.column = column;
              this.endColumn = endColumn;
            }
          }
        } catch (nop) {
          /* Ignore if the browser is very particular */
        }
      }

      Exception.prototype = new Error();
      exports['default'] = Exception;
      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(7),
        __esModule: true
      };
      /***/
    }, function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);

      module.exports = function defineProperty(it, key, desc) {
        return $.setDesc(it, key, desc);
      };
      /***/

    }, function (module, exports) {
      var $Object = Object;
      module.exports = {
        create: $Object.create,
        getProto: $Object.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: $Object.getOwnPropertyDescriptor,
        setDesc: $Object.defineProperty,
        setDescs: $Object.defineProperties,
        getKeys: $Object.keys,
        getNames: $Object.getOwnPropertyNames,
        getSymbols: $Object.getOwnPropertySymbols,
        each: [].forEach
      };
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.registerDefaultHelpers = registerDefaultHelpers;
      exports.moveHelperToHooks = moveHelperToHooks;

      var _helpersBlockHelperMissing = __webpack_require__(10);

      var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

      var _helpersEach = __webpack_require__(11);

      var _helpersEach2 = _interopRequireDefault(_helpersEach);

      var _helpersHelperMissing = __webpack_require__(24);

      var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

      var _helpersIf = __webpack_require__(25);

      var _helpersIf2 = _interopRequireDefault(_helpersIf);

      var _helpersLog = __webpack_require__(26);

      var _helpersLog2 = _interopRequireDefault(_helpersLog);

      var _helpersLookup = __webpack_require__(27);

      var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

      var _helpersWith = __webpack_require__(28);

      var _helpersWith2 = _interopRequireDefault(_helpersWith);

      function registerDefaultHelpers(instance) {
        _helpersBlockHelperMissing2['default'](instance);

        _helpersEach2['default'](instance);

        _helpersHelperMissing2['default'](instance);

        _helpersIf2['default'](instance);

        _helpersLog2['default'](instance);

        _helpersLookup2['default'](instance);

        _helpersWith2['default'](instance);
      }

      function moveHelperToHooks(instance, helperName, keepHelper) {
        if (instance.helpers[helperName]) {
          instance.hooks[helperName] = instance.helpers[helperName];

          if (!keepHelper) {
            delete instance.helpers[helperName];
          }
        }
      }
      /***/

    }, function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      exports['default'] = function (instance) {
        instance.registerHelper('blockHelperMissing', function (context, options) {
          var inverse = options.inverse,
              fn = options.fn;

          if (context === true) {
            return fn(this);
          } else if (context === false || context == null) {
            return inverse(this);
          } else if (_utils.isArray(context)) {
            if (context.length > 0) {
              if (options.ids) {
                options.ids = [options.name];
              }

              return instance.helpers.each(context, options);
            } else {
              return inverse(this);
            }
          } else {
            if (options.data && options.ids) {
              var data = _utils.createFrame(options.data);

              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
              options = {
                data: data
              };
            }

            return fn(context, options);
          }
        });
      };

      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */
      (function (global) {
        'use strict';

        var _Object$keys = __webpack_require__(12)['default'];

        var _interopRequireDefault = __webpack_require__(2)['default'];

        exports.__esModule = true;

        var _utils = __webpack_require__(4);

        var _exception = __webpack_require__(5);

        var _exception2 = _interopRequireDefault(_exception);

        exports['default'] = function (instance) {
          instance.registerHelper('each', function (context, options) {
            if (!options) {
              throw new _exception2['default']('Must pass iterator to #each');
            }

            var fn = options.fn,
                inverse = options.inverse,
                i = 0,
                ret = '',
                data = undefined,
                contextPath = undefined;

            if (options.data && options.ids) {
              contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
            }

            if (_utils.isFunction(context)) {
              context = context.call(this);
            }

            if (options.data) {
              data = _utils.createFrame(options.data);
            }

            function execIteration(field, index, last) {
              if (data) {
                data.key = field;
                data.index = index;
                data.first = index === 0;
                data.last = !!last;

                if (contextPath) {
                  data.contextPath = contextPath + field;
                }
              }

              ret = ret + fn(context[field], {
                data: data,
                blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
              });
            }

            if (context && typeof context === 'object') {
              if (_utils.isArray(context)) {
                for (var j = context.length; i < j; i++) {
                  if (i in context) {
                    execIteration(i, i, i === context.length - 1);
                  }
                }
              } else if (global.Symbol && context[global.Symbol.iterator]) {
                var newContext = [];
                var iterator = context[global.Symbol.iterator]();

                for (var it = iterator.next(); !it.done; it = iterator.next()) {
                  newContext.push(it.value);
                }

                context = newContext;

                for (var j = context.length; i < j; i++) {
                  execIteration(i, i, i === context.length - 1);
                }
              } else {
                (function () {
                  var priorKey = undefined;

                  _Object$keys(context).forEach(function (key) {
                    // We're running the iterations one step out of sync so we can detect
                    // the last iteration without have to scan the object twice and create
                    // an itermediate keys array.
                    if (priorKey !== undefined) {
                      execIteration(priorKey, i - 1);
                    }

                    priorKey = key;
                    i++;
                  });

                  if (priorKey !== undefined) {
                    execIteration(priorKey, i - 1, true);
                  }
                })();
              }
            }

            if (i === 0) {
              ret = inverse(this);
            }

            return ret;
          });
        };

        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());
      /***/
    }, function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(13),
        __esModule: true
      };
      /***/
    }, function (module, exports, __webpack_require__) {
      __webpack_require__(14);

      module.exports = __webpack_require__(20).Object.keys;
      /***/
    }, function (module, exports, __webpack_require__) {
      // 19.1.2.14 Object.keys(O)
      var toObject = __webpack_require__(15);

      __webpack_require__(17)('keys', function ($keys) {
        return function keys(it) {
          return $keys(toObject(it));
        };
      });
      /***/

    }, function (module, exports, __webpack_require__) {
      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__(16);

      module.exports = function (it) {
        return Object(defined(it));
      };
      /***/

    }, function (module, exports) {
      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function (it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
      };
      /***/

    }, function (module, exports, __webpack_require__) {
      // most Object methods by ES6 should accept primitives
      var $export = __webpack_require__(18),
          core = __webpack_require__(20),
          fails = __webpack_require__(23);

      module.exports = function (KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY],
            exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function () {
          fn(1);
        }), 'Object', exp);
      };
      /***/

    }, function (module, exports, __webpack_require__) {
      var global = __webpack_require__(19),
          core = __webpack_require__(20),
          ctx = __webpack_require__(21),
          PROTOTYPE = 'prototype';

      var $export = function (type, name, source) {
        var IS_FORCED = type & $export.F,
            IS_GLOBAL = type & $export.G,
            IS_STATIC = type & $export.S,
            IS_PROTO = type & $export.P,
            IS_BIND = type & $export.B,
            IS_WRAP = type & $export.W,
            exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
            target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
            key,
            own,
            out;
        if (IS_GLOBAL) source = name;

        for (key in source) {
          // contains in native
          own = !IS_FORCED && target && key in target;
          if (own && key in exports) continue; // export native or passed

          out = own ? target[key] : source[key]; // prevent global pollution for namespaces

          exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
          : IS_BIND && own ? ctx(out, global) // wrap global constructors for prevent change them in library
          : IS_WRAP && target[key] == out ? function (C) {
            var F = function (param) {
              return this instanceof C ? new C(param) : C(param);
            };

            F[PROTOTYPE] = C[PROTOTYPE];
            return F; // make static versions for prototype methods
          }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
          if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
        }
      }; // type bitmap


      $export.F = 1; // forced

      $export.G = 2; // global

      $export.S = 4; // static

      $export.P = 8; // proto

      $export.B = 16; // bind

      $export.W = 32; // wrap

      module.exports = $export;
      /***/
    }, function (module, exports) {
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
      if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

      /***/
    }, function (module, exports) {
      var core = module.exports = {
        version: '1.2.6'
      };
      if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

      /***/
    }, function (module, exports, __webpack_require__) {
      // optional / simple context binding
      var aFunction = __webpack_require__(22);

      module.exports = function (fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;

        switch (length) {
          case 1:
            return function (a) {
              return fn.call(that, a);
            };

          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };

          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }

        return function () {
          return fn.apply(that, arguments);
        };
      };
      /***/

    }, function (module, exports) {
      module.exports = function (it) {
        if (typeof it != 'function') throw TypeError(it + ' is not a function!');
        return it;
      };
      /***/

    }, function (module, exports) {
      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };
      /***/

    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('helperMissing', function ()
        /* [args, ]options */
        {
          if (arguments.length === 1) {
            // A missing field in a {{foo}} construct.
            return undefined;
          } else {
            // Someone is actually trying to call something, blow up.
            throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
          }
        });
      };

      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('if', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#if requires exactly one argument');
          }

          if (_utils.isFunction(conditional)) {
            conditional = conditional.call(this);
          } // Default behavior is to render the positive path if the value is truthy and not empty.
          // The `includeZero` option may be set to treat the condtional as purely not empty based on the
          // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.


          if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
            return options.inverse(this);
          } else {
            return options.fn(this);
          }
        });
        instance.registerHelper('unless', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#unless requires exactly one argument');
          }

          return instance.helpers['if'].call(this, conditional, {
            fn: options.inverse,
            inverse: options.fn,
            hash: options.hash
          });
        });
      };

      module.exports = exports['default'];
      /***/
    }, function (module, exports) {
      'use strict';

      exports.__esModule = true;

      exports['default'] = function (instance) {
        instance.registerHelper('log', function ()
        /* message, options */
        {
          var args = [undefined],
              options = arguments[arguments.length - 1];

          for (var i = 0; i < arguments.length - 1; i++) {
            args.push(arguments[i]);
          }

          var level = 1;

          if (options.hash.level != null) {
            level = options.hash.level;
          } else if (options.data && options.data.level != null) {
            level = options.data.level;
          }

          args[0] = level;
          instance.log.apply(instance, args);
        });
      };

      module.exports = exports['default'];
      /***/
    }, function (module, exports) {
      'use strict';

      exports.__esModule = true;

      exports['default'] = function (instance) {
        instance.registerHelper('lookup', function (obj, field, options) {
          if (!obj) {
            // Note for 5.0: Change to "obj == null" in 5.0
            return obj;
          }

          return options.lookupProperty(obj, field);
        });
      };

      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('with', function (context, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#with requires exactly one argument');
          }

          if (_utils.isFunction(context)) {
            context = context.call(this);
          }

          var fn = options.fn;

          if (!_utils.isEmpty(context)) {
            var data = options.data;

            if (options.data && options.ids) {
              data = _utils.createFrame(options.data);
              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
            }

            return fn(context, {
              data: data,
              blockParams: _utils.blockParams([context], [data && data.contextPath])
            });
          } else {
            return options.inverse(this);
          }
        });
      };

      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.registerDefaultDecorators = registerDefaultDecorators;

      var _decoratorsInline = __webpack_require__(30);

      var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

      function registerDefaultDecorators(instance) {
        _decoratorsInline2['default'](instance);
      }
      /***/

    }, function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      exports['default'] = function (instance) {
        instance.registerDecorator('inline', function (fn, props, container, options) {
          var ret = fn;

          if (!props.partials) {
            props.partials = {};

            ret = function (context, options) {
              // Create a new partials stack frame prior to exec.
              var original = container.partials;
              container.partials = _utils.extend({}, original, props.partials);
              var ret = fn(context, options);
              container.partials = original;
              return ret;
            };
          }

          props.partials[options.args[0]] = options.fn;
          return ret;
        });
      };

      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var logger = {
        methodMap: ['debug', 'info', 'warn', 'error'],
        level: 'info',
        // Maps a given level value to the `methodMap` indexes above.
        lookupLevel: function lookupLevel(level) {
          if (typeof level === 'string') {
            var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());

            if (levelMap >= 0) {
              level = levelMap;
            } else {
              level = parseInt(level, 10);
            }
          }

          return level;
        },
        // Can be overridden in the host environment
        log: function log(level) {
          level = logger.lookupLevel(level);

          if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
            var method = logger.methodMap[level]; // eslint-disable-next-line no-console

            if (!console[method]) {
              method = 'log';
            }

            for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              message[_key - 1] = arguments[_key];
            }

            console[method].apply(console, message); // eslint-disable-line no-console
          }
        }
      };
      exports['default'] = logger;
      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];

      var _Object$keys = __webpack_require__(12)['default'];

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      exports.__esModule = true;
      exports.createProtoAccessControl = createProtoAccessControl;
      exports.resultIsAllowed = resultIsAllowed;
      exports.resetLoggedProperties = resetLoggedProperties;

      var _createNewLookupObject = __webpack_require__(35);

      var _logger = __webpack_require__(31);

      var logger = _interopRequireWildcard(_logger);

      var loggedProperties = _Object$create(null);

      function createProtoAccessControl(runtimeOptions) {
        var defaultMethodWhiteList = _Object$create(null);

        defaultMethodWhiteList['constructor'] = false;
        defaultMethodWhiteList['__defineGetter__'] = false;
        defaultMethodWhiteList['__defineSetter__'] = false;
        defaultMethodWhiteList['__lookupGetter__'] = false;

        var defaultPropertyWhiteList = _Object$create(null); // eslint-disable-next-line no-proto


        defaultPropertyWhiteList['__proto__'] = false;
        return {
          properties: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
            defaultValue: runtimeOptions.allowProtoPropertiesByDefault
          },
          methods: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
            defaultValue: runtimeOptions.allowProtoMethodsByDefault
          }
        };
      }

      function resultIsAllowed(result, protoAccessControl, propertyName) {
        if (typeof result === 'function') {
          return checkWhiteList(protoAccessControl.methods, propertyName);
        } else {
          return checkWhiteList(protoAccessControl.properties, propertyName);
        }
      }

      function checkWhiteList(protoAccessControlForType, propertyName) {
        if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
          return protoAccessControlForType.whitelist[propertyName] === true;
        }

        if (protoAccessControlForType.defaultValue !== undefined) {
          return protoAccessControlForType.defaultValue;
        }

        logUnexpecedPropertyAccessOnce(propertyName);
        return false;
      }

      function logUnexpecedPropertyAccessOnce(propertyName) {
        if (loggedProperties[propertyName] !== true) {
          loggedProperties[propertyName] = true;
          logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
        }
      }

      function resetLoggedProperties() {
        _Object$keys(loggedProperties).forEach(function (propertyName) {
          delete loggedProperties[propertyName];
        });
      }
      /***/

    }, function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(34),
        __esModule: true
      };
      /***/
    }, function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);

      module.exports = function create(P, D) {
        return $.create(P, D);
      };
      /***/

    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];

      exports.__esModule = true;
      exports.createNewLookupObject = createNewLookupObject;

      var _utils = __webpack_require__(4);
      /**
       * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
       * The resulting object can be used with "object[property]" to check if a property exists
       * @param {...object} sources a varargs parameter of source objects that will be merged
       * @returns {object}
       */


      function createNewLookupObject() {
        for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }

        return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources));
      }
      /***/

    }, function (module, exports) {
      // Build out our basic SafeString type
      'use strict';

      exports.__esModule = true;

      function SafeString(string) {
        this.string = string;
      }

      SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
        return '' + this.string;
      };

      exports['default'] = SafeString;
      module.exports = exports['default'];
      /***/
    }, function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$seal = __webpack_require__(38)['default'];

      var _Object$keys = __webpack_require__(12)['default'];

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.checkRevision = checkRevision;
      exports.template = template;
      exports.wrapProgram = wrapProgram;
      exports.resolvePartial = resolvePartial;
      exports.invokePartial = invokePartial;
      exports.noop = noop;

      var _utils = __webpack_require__(4);

      var Utils = _interopRequireWildcard(_utils);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      var _base = __webpack_require__(3);

      var _helpers = __webpack_require__(9);

      var _internalWrapHelper = __webpack_require__(42);

      var _internalProtoAccess = __webpack_require__(32);

      function checkRevision(compilerInfo) {
        var compilerRevision = compilerInfo && compilerInfo[0] || 1,
            currentRevision = _base.COMPILER_REVISION;

        if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
          return;
        }

        if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
          var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
              compilerVersions = _base.REVISION_CHANGES[compilerRevision];
          throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
        }
      }

      function template(templateSpec, env) {
        /* istanbul ignore next */
        if (!env) {
          throw new _exception2['default']('No environment passed to template');
        }

        if (!templateSpec || !templateSpec.main) {
          throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
        }

        templateSpec.main.decorator = templateSpec.main_d; // Note: Using env.VM references rather than local var references throughout this section to allow
        // for external users to override these as pseudo-supported APIs.

        env.VM.checkRevision(templateSpec.compiler); // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)

        var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

        function invokePartialWrapper(partial, context, options) {
          if (options.hash) {
            context = Utils.extend({}, context, options.hash);

            if (options.ids) {
              options.ids[0] = true;
            }
          }

          partial = env.VM.resolvePartial.call(this, partial, context, options);
          var extendedOptions = Utils.extend({}, options, {
            hooks: this.hooks,
            protoAccessControl: this.protoAccessControl
          });
          var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

          if (result == null && env.compile) {
            options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
            result = options.partials[options.name](context, extendedOptions);
          }

          if (result != null) {
            if (options.indent) {
              var lines = result.split('\n');

              for (var i = 0, l = lines.length; i < l; i++) {
                if (!lines[i] && i + 1 === l) {
                  break;
                }

                lines[i] = options.indent + lines[i];
              }

              result = lines.join('\n');
            }

            return result;
          } else {
            throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
          }
        } // Just add water


        var container = {
          strict: function strict(obj, name, loc) {
            if (!obj || !(name in obj)) {
              throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
                loc: loc
              });
            }

            return container.lookupProperty(obj, name);
          },
          lookupProperty: function lookupProperty(parent, propertyName) {
            var result = parent[propertyName];

            if (result == null) {
              return result;
            }

            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return result;
            }

            if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
              return result;
            }

            return undefined;
          },
          lookup: function lookup(depths, name) {
            var len = depths.length;

            for (var i = 0; i < len; i++) {
              var result = depths[i] && container.lookupProperty(depths[i], name);

              if (result != null) {
                return depths[i][name];
              }
            }
          },
          lambda: function lambda(current, context) {
            return typeof current === 'function' ? current.call(context) : current;
          },
          escapeExpression: Utils.escapeExpression,
          invokePartial: invokePartialWrapper,
          fn: function fn(i) {
            var ret = templateSpec[i];
            ret.decorator = templateSpec[i + '_d'];
            return ret;
          },
          programs: [],
          program: function program(i, data, declaredBlockParams, blockParams, depths) {
            var programWrapper = this.programs[i],
                fn = this.fn(i);

            if (data || depths || blockParams || declaredBlockParams) {
              programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
            } else if (!programWrapper) {
              programWrapper = this.programs[i] = wrapProgram(this, i, fn);
            }

            return programWrapper;
          },
          data: function data(value, depth) {
            while (value && depth--) {
              value = value._parent;
            }

            return value;
          },
          mergeIfNeeded: function mergeIfNeeded(param, common) {
            var obj = param || common;

            if (param && common && param !== common) {
              obj = Utils.extend({}, common, param);
            }

            return obj;
          },
          // An empty object to use as replacement for null-contexts
          nullContext: _Object$seal({}),
          noop: env.VM.noop,
          compilerInfo: templateSpec.compiler
        };

        function ret(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var data = options.data;

          ret._setup(options);

          if (!options.partial && templateSpec.useData) {
            data = initData(context, data);
          }

          var depths = undefined,
              blockParams = templateSpec.useBlockParams ? [] : undefined;

          if (templateSpec.useDepths) {
            if (options.depths) {
              depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
            } else {
              depths = [context];
            }
          }

          function main(context
          /*, options*/
          ) {
            return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
          }

          main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
          return main(context, options);
        }

        ret.isTop = true;

        ret._setup = function (options) {
          if (!options.partial) {
            var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
            wrapHelpersToPassLookupProperty(mergedHelpers, container);
            container.helpers = mergedHelpers;

            if (templateSpec.usePartial) {
              // Use mergeIfNeeded here to prevent compiling global partials multiple times
              container.partials = container.mergeIfNeeded(options.partials, env.partials);
            }

            if (templateSpec.usePartial || templateSpec.useDecorators) {
              container.decorators = Utils.extend({}, env.decorators, options.decorators);
            }

            container.hooks = {};
            container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
            var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;

            _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);

            _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
          } else {
            container.protoAccessControl = options.protoAccessControl; // internal option

            container.helpers = options.helpers;
            container.partials = options.partials;
            container.decorators = options.decorators;
            container.hooks = options.hooks;
          }
        };

        ret._child = function (i, data, blockParams, depths) {
          if (templateSpec.useBlockParams && !blockParams) {
            throw new _exception2['default']('must pass block params');
          }

          if (templateSpec.useDepths && !depths) {
            throw new _exception2['default']('must pass parent depths');
          }

          return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
        };

        return ret;
      }

      function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
        function prog(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var currentDepths = depths;

          if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
            currentDepths = [context].concat(depths);
          }

          return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
        }

        prog = executeDecorators(fn, prog, container, depths, data, blockParams);
        prog.program = i;
        prog.depth = depths ? depths.length : 0;
        prog.blockParams = declaredBlockParams || 0;
        return prog;
      }
      /**
       * This is currently part of the official API, therefore implementation details should not be changed.
       */


      function resolvePartial(partial, context, options) {
        if (!partial) {
          if (options.name === '@partial-block') {
            partial = options.data['partial-block'];
          } else {
            partial = options.partials[options.name];
          }
        } else if (!partial.call && !options.name) {
          // This is a dynamic partial that returned a string
          options.name = partial;
          partial = options.partials[partial];
        }

        return partial;
      }

      function invokePartial(partial, context, options) {
        // Use the current closure context to save the partial-block if this partial
        var currentPartialBlock = options.data && options.data['partial-block'];
        options.partial = true;

        if (options.ids) {
          options.data.contextPath = options.ids[0] || options.data.contextPath;
        }

        var partialBlock = undefined;

        if (options.fn && options.fn !== noop) {
          (function () {
            options.data = _base.createFrame(options.data); // Wrapper function to get access to currentPartialBlock from the closure

            var fn = options.fn;

            partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
              var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]; // Restore the partial-block from the closure for the execution of the block
              // i.e. the part inside the block of the partial call.

              options.data = _base.createFrame(options.data);
              options.data['partial-block'] = currentPartialBlock;
              return fn(context, options);
            };

            if (fn.partials) {
              options.partials = Utils.extend({}, options.partials, fn.partials);
            }
          })();
        }

        if (partial === undefined && partialBlock) {
          partial = partialBlock;
        }

        if (partial === undefined) {
          throw new _exception2['default']('The partial ' + options.name + ' could not be found');
        } else if (partial instanceof Function) {
          return partial(context, options);
        }
      }

      function noop() {
        return '';
      }

      function initData(context, data) {
        if (!data || !('root' in data)) {
          data = data ? _base.createFrame(data) : {};
          data.root = context;
        }

        return data;
      }

      function executeDecorators(fn, prog, container, depths, data, blockParams) {
        if (fn.decorator) {
          var props = {};
          prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
          Utils.extend(prog, props);
        }

        return prog;
      }

      function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
        _Object$keys(mergedHelpers).forEach(function (helperName) {
          var helper = mergedHelpers[helperName];
          mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
        });
      }

      function passLookupPropertyOption(helper, container) {
        var lookupProperty = container.lookupProperty;
        return _internalWrapHelper.wrapHelper(helper, function (options) {
          return Utils.extend({
            lookupProperty: lookupProperty
          }, options);
        });
      }
      /***/

    }, function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(39),
        __esModule: true
      };
      /***/
    }, function (module, exports, __webpack_require__) {
      __webpack_require__(40);

      module.exports = __webpack_require__(20).Object.seal;
      /***/
    }, function (module, exports, __webpack_require__) {
      // 19.1.2.17 Object.seal(O)
      var isObject = __webpack_require__(41);

      __webpack_require__(17)('seal', function ($seal) {
        return function seal(it) {
          return $seal && isObject(it) ? $seal(it) : it;
        };
      });
      /***/

    }, function (module, exports) {
      module.exports = function (it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
      };
      /***/

    }, function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.wrapHelper = wrapHelper;

      function wrapHelper(helper, transformOptionsFn) {
        if (typeof helper !== 'function') {
          // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
          // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
          return helper;
        }

        var wrapper = function wrapper()
        /* dynamic arguments */
        {
          var options = arguments[arguments.length - 1];
          arguments[arguments.length - 1] = transformOptionsFn(options);
          return helper.apply(this, arguments);
        };

        return wrapper;
      }
      /***/

    }, function (module, exports) {
      /* WEBPACK VAR INJECTION */
      (function (global) {
        'use strict';

        exports.__esModule = true;

        exports['default'] = function (Handlebars) {
          /* istanbul ignore next */
          var root = typeof global !== 'undefined' ? global : window,
              $Handlebars = root.Handlebars;
          /* istanbul ignore next */

          Handlebars.noConflict = function () {
            if (root.Handlebars === Handlebars) {
              root.Handlebars = $Handlebars;
            }

            return Handlebars;
          };
        };

        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());
      /***/
    }])
  );
});

;
},{}],"../src/components/buttons/submit-button.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<button type=\"submit\" class=\"" + alias4((helper = (helper = lookupProperty(helpers, "class") || (depth0 != null ? lookupProperty(depth0, "class") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "class",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 29
        },
        "end": {
          "line": 1,
          "column": 38
        }
      }
    }) : helper)) + "\" name=\"" + alias4((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "name",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 46
        },
        "end": {
          "line": 1,
          "column": 54
        }
      }
    }) : helper)) + "\">" + alias4((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "title",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 56
        },
        "end": {
          "line": 1,
          "column": 65
        }
      }
    }) : helper)) + "</button>";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/components/buttons/submit-button.js":[function(require,module,exports) {
"use strict";

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

var _submitButton = _interopRequireDefault(require("./submit-button.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars.default.registerPartial("submit", _submitButton.default);
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js","./submit-button.hbs":"../src/components/buttons/submit-button.hbs"}],"../src/components/headings/headings.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<h" + alias4((helper = (helper = lookupProperty(helpers, "level") || (depth0 != null ? lookupProperty(depth0, "level") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "level",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 2
        },
        "end": {
          "line": 1,
          "column": 11
        }
      }
    }) : helper)) + " class=\"" + alias4((helper = (helper = lookupProperty(helpers, "class") || (depth0 != null ? lookupProperty(depth0, "class") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "class",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 19
        },
        "end": {
          "line": 1,
          "column": 28
        }
      }
    }) : helper)) + "\">" + alias4((helper = (helper = lookupProperty(helpers, "text") || (depth0 != null ? lookupProperty(depth0, "text") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "text",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 30
        },
        "end": {
          "line": 1,
          "column": 38
        }
      }
    }) : helper)) + "</h" + alias4((helper = (helper = lookupProperty(helpers, "level") || (depth0 != null ? lookupProperty(depth0, "level") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "level",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 41
        },
        "end": {
          "line": 1,
          "column": 50
        }
      }
    }) : helper)) + ">";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/components/headings/headings.js":[function(require,module,exports) {
"use strict";

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

var _headings = _interopRequireDefault(require("./headings.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars.default.registerPartial("heading", _headings.default);
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js","./headings.hbs":"../src/components/headings/headings.hbs"}],"../src/components/inputs/text-input.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"input-wrapper\">\n    <label for=\"" + alias4((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "name",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 16
        },
        "end": {
          "line": 2,
          "column": 24
        }
      }
    }) : helper)) + "\">" + alias4((helper = (helper = lookupProperty(helpers, "label") || (depth0 != null ? lookupProperty(depth0, "label") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "label",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 26
        },
        "end": {
          "line": 2,
          "column": 35
        }
      }
    }) : helper)) + "</label>\n    <input type=\"" + alias4((helper = (helper = lookupProperty(helpers, "type") || (depth0 != null ? lookupProperty(depth0, "type") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "type",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 17
        },
        "end": {
          "line": 3,
          "column": 25
        }
      }
    }) : helper)) + "\" class=\"" + alias4((helper = (helper = lookupProperty(helpers, "class") || (depth0 != null ? lookupProperty(depth0, "class") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "class",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 34
        },
        "end": {
          "line": 3,
          "column": 43
        }
      }
    }) : helper)) + "\" name=\"" + alias4((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "name",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 51
        },
        "end": {
          "line": 3,
          "column": 59
        }
      }
    }) : helper)) + "\" placeholder=\"" + alias4((helper = (helper = lookupProperty(helpers, "placeholder") || (depth0 != null ? lookupProperty(depth0, "placeholder") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "placeholder",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 74
        },
        "end": {
          "line": 3,
          "column": 89
        }
      }
    }) : helper)) + "\" value=\"" + alias4((helper = (helper = lookupProperty(helpers, "value") || (depth0 != null ? lookupProperty(depth0, "value") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "value",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 98
        },
        "end": {
          "line": 3,
          "column": 107
        }
      }
    }) : helper)) + "\" " + alias4((helper = (helper = lookupProperty(helpers, "req") || (depth0 != null ? lookupProperty(depth0, "req") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "req",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 109
        },
        "end": {
          "line": 3,
          "column": 116
        }
      }
    }) : helper)) + ">\n</div>";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/components/inputs/text-input.js":[function(require,module,exports) {
"use strict";

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

var _textInput = _interopRequireDefault(require("./text-input.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars.default.registerPartial("textInput", _textInput.default);
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js","./text-input.hbs":"../src/components/inputs/text-input.hbs"}],"../src/pages/chats/login/login.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "1": function _(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return (stack1 = container.invokePartial(lookupProperty(partials, "textInput"), depth0, {
      "name": "textInput",
      "data": data,
      "indent": "      ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<section class=\"wrapper\">\n  <div class=\"form--login-wrap\">\n" + ((stack1 = container.invokePartial(lookupProperty(partials, "heading"), depth0 != null ? lookupProperty(depth0, "heading") : depth0, {
      "name": "heading",
      "data": data,
      "indent": "  ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "    <form action=\"\" class=\"form--login\" enctype=\"multipart/form-data\">\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "textInputs") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 4
        },
        "end": {
          "line": 7,
          "column": 13
        }
      }
    })) != null ? stack1 : "") + ((stack1 = container.invokePartial(lookupProperty(partials, "submit"), depth0 != null ? lookupProperty(depth0, "submit") : depth0, {
      "name": "submit",
      "data": data,
      "indent": "    ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "    </form>\n    <a href=\"\" class=\"form--login-register-link\">Нет аккаунта?</a>\n  </div>\n</section>";
  },
  "usePartial": true,
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/chats/login/login.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLoginPage = addLoginPage;

require("../../../components/buttons/submit-button");

require("../../../components/headings/headings");

require("../../../components/inputs/text-input");

var _login = _interopRequireDefault(require("./login.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addLoginPage() {
  var loginFormData = {
    heading: {
      level: '3',
      class: "",
      text: "Вход"
    },
    textInputs: {
      login: {
        label: "Логин",
        type: "text",
        name: "login",
        placeholder: "Имя пользователя",
        req: "reqiured"
      },
      password: {
        label: "Пароль",
        type: "password",
        name: "password",
        placeholder: "***********",
        req: "required"
      }
    },
    submit: {
      class: "form--login-submit",
      name: "login-submit",
      title: "Авторизоваться"
    }
  };
  return document.querySelector('.root').innerHTML = (0, _login.default)(loginFormData);
}
},{"../../../components/buttons/submit-button":"../src/components/buttons/submit-button.js","../../../components/headings/headings":"../src/components/headings/headings.js","../../../components/inputs/text-input":"../src/components/inputs/text-input.js","./login.hbs":"../src/pages/chats/login/login.hbs"}],"../src/pages/chats/register/register.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "1": function _(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return (stack1 = container.invokePartial(lookupProperty(partials, "textInput"), depth0, {
      "name": "textInput",
      "data": data,
      "indent": "      ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"wrapper\">\n  <div class=\"form--register-wrap\">\n" + ((stack1 = container.invokePartial(lookupProperty(partials, "heading"), depth0 != null ? lookupProperty(depth0, "heading") : depth0, {
      "name": "heading",
      "data": data,
      "indent": "  ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "    <form action=\"\" class=\"form--register\" enctype=\"multipart/form-data\">\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "textInputs") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 4
        },
        "end": {
          "line": 7,
          "column": 13
        }
      }
    })) != null ? stack1 : "") + ((stack1 = container.invokePartial(lookupProperty(partials, "submit"), depth0 != null ? lookupProperty(depth0, "submit") : depth0, {
      "name": "submit",
      "data": data,
      "indent": "    ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "    </form>\n    <a href=\"\" class=\"form--register-login-link\">Авторизоваться</a>\n</div>\n</div>";
  },
  "usePartial": true,
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/chats/register/register.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRegisterPage = addRegisterPage;

require("../../../components/buttons/submit-button");

require("../../../components/headings/headings");

require("../../../components/inputs/text-input");

var _register = _interopRequireDefault(require("./register.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRegisterPage() {
  var regFormData = {
    heading: {
      level: '3',
      class: "",
      text: "Регистрация"
    },
    textInputs: {
      email: {
        label: "E-mail",
        type: "email",
        name: "email",
        placeholder: "email",
        req: "reqiured"
      },
      login: {
        label: "Логин",
        type: "text",
        name: "login",
        placeholder: "Имя пользователя",
        req: "reqiured"
      },
      firstname: {
        label: "Имя",
        type: "text",
        name: "first_name",
        placeholder: "Ваше имя",
        req: "reqiured"
      },
      lastname: {
        label: "Фамилия",
        type: "text",
        name: "second_name",
        placeholder: "Ваша фамилия"
      },
      phone: {
        label: "Телефон",
        type: "tel",
        name: "phone",
        placeholder: "+7 (000)-000-00-00",
        req: "reqiured"
      },
      password: {
        label: "Пароль",
        type: "password",
        name: "password",
        placeholder: "***********",
        req: "required"
      },
      passwordrepeat: {
        label: "Повторите пароль",
        type: "password",
        name: "repeat-password",
        placeholder: "***********",
        req: "required"
      }
    },
    submit: {
      class: "form--register-submit",
      name: "registration-submit",
      title: "Зарегистрироваться"
    }
  };
  document.querySelector('.root').innerHTML = (0, _register.default)(regFormData);
}

;
},{"../../../components/buttons/submit-button":"../src/components/buttons/submit-button.js","../../../components/headings/headings":"../src/components/headings/headings.js","../../../components/inputs/text-input":"../src/components/inputs/text-input.js","./register.hbs":"../src/pages/chats/register/register.hbs"}],"../src/components/inputs/search-input.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"input-wrapper\">\n    <input type=\"search\" class=\"" + alias4((helper = (helper = lookupProperty(helpers, "class") || (depth0 != null ? lookupProperty(depth0, "class") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "class",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 32
        },
        "end": {
          "line": 2,
          "column": 41
        }
      }
    }) : helper)) + "\" name=\"" + alias4((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "name",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 49
        },
        "end": {
          "line": 2,
          "column": 57
        }
      }
    }) : helper)) + "\" placeholder=\"" + alias4((helper = (helper = lookupProperty(helpers, "placeholder") || (depth0 != null ? lookupProperty(depth0, "placeholder") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "placeholder",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 72
        },
        "end": {
          "line": 2,
          "column": 87
        }
      }
    }) : helper)) + "\">\n</div>";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/components/inputs/search-input.js":[function(require,module,exports) {
"use strict";

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

var _searchInput = _interopRequireDefault(require("./search-input.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars.default.registerPartial("searchInput", _searchInput.default);
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js","./search-input.hbs":"../src/components/inputs/search-input.hbs"}],"../src/components/avatar/avatar.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"avatar-wrap " + alias4((helper = (helper = lookupProperty(helpers, "divclass") || (depth0 != null ? lookupProperty(depth0, "divclass") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "divclass",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 24
        },
        "end": {
          "line": 1,
          "column": 36
        }
      }
    }) : helper)) + "\">\n    <img src=\"" + alias4((helper = (helper = lookupProperty(helpers, "imagesrc") || (depth0 != null ? lookupProperty(depth0, "imagesrc") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "imagesrc",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 14
        },
        "end": {
          "line": 2,
          "column": 26
        }
      }
    }) : helper)) + "\">\n</div>";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/components/avatar/avatar.js":[function(require,module,exports) {
"use strict";

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

var _avatar = _interopRequireDefault(require("./avatar.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars.default.registerPartial("avatar", _avatar.default);
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js","./avatar.hbs":"../src/components/avatar/avatar.hbs"}],"../src/modules/chat-list-profile-card/chat-list-profile-card.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"chat--list-profile-card-wrap\">\n    <div class=\"chat--list-profile-card-actions\">" + ((stack1 = container.invokePartial(lookupProperty(partials, "avatar"), depth0 != null ? lookupProperty(depth0, "avatar") : depth0, {
      "name": "avatar",
      "data": data,
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "</div>\n" + ((stack1 = container.invokePartial(lookupProperty(partials, "searchInput"), depth0 != null ? lookupProperty(depth0, "search") : depth0, {
      "name": "searchInput",
      "data": data,
      "indent": "    ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "</div>";
  },
  "usePartial": true,
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/modules/chat-list-profile-card/chat-list-profile-card.js":[function(require,module,exports) {
"use strict";

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

require("../../components/inputs/search-input");

require("../../components/avatar/avatar");

var _chatListProfileCard = _interopRequireDefault(require("./chat-list-profile-card.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars.default.registerPartial("profileCard", _chatListProfileCard.default);
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js","../../components/inputs/search-input":"../src/components/inputs/search-input.js","../../components/avatar/avatar":"../src/components/avatar/avatar.js","./chat-list-profile-card.hbs":"../src/modules/chat-list-profile-card/chat-list-profile-card.hbs"}],"../src/pages/chats/main/main.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"main--page-wrap\">\n  <div class=\"chat--list-wrap\">\n" + ((stack1 = container.invokePartial(lookupProperty(partials, "profileCard"), depth0 != null ? lookupProperty(depth0, "card") : depth0, {
      "name": "profileCard",
      "data": data,
      "indent": "    ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "  </div>\n  <div class=\"chat--wrap\">Выберите чат чтобы отправить сообщение</div>\n    \n</div>";
  },
  "usePartial": true,
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/chats/main/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMainPage = addMainPage;

require("../../../modules/chat-list-profile-card/chat-list-profile-card");

var _main = _interopRequireDefault(require("./main.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addMainPage() {
  var mainPageData = {
    card: {
      avatar: {
        imagesrc: "/noimage.png",
        divclass: "chat-list-profile-card profile-card-avatar"
      },
      search: {
        class: "chat-list-profile-card profile-card-search",
        name: "search",
        placeholder: "Поиск"
      }
    }
  };
  document.querySelector('.root').innerHTML = (0, _main.default)(mainPageData);
}

;
},{"../../../modules/chat-list-profile-card/chat-list-profile-card":"../src/modules/chat-list-profile-card/chat-list-profile-card.js","./main.hbs":"../src/pages/chats/main/main.hbs"}],"../src/components/profile-field/profile-field.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"profile-field-wrap\">\n    <div class=\"profile-field-label\">" + alias4((helper = (helper = lookupProperty(helpers, "label") || (depth0 != null ? lookupProperty(depth0, "label") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "label",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 37
        },
        "end": {
          "line": 2,
          "column": 46
        }
      }
    }) : helper)) + "</div>\n    <div class=\"profile-field-data\">" + alias4((helper = (helper = lookupProperty(helpers, "data") || (depth0 != null ? lookupProperty(depth0, "data") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "data",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 36
        },
        "end": {
          "line": 3,
          "column": 44
        }
      }
    }) : helper)) + "</div>\n</div>";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/components/profile-field/profile-field.js":[function(require,module,exports) {
"use strict";

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

var _profileField = _interopRequireDefault(require("./profile-field.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars.default.registerPartial("profileField", _profileField.default);
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js","./profile-field.hbs":"../src/components/profile-field/profile-field.hbs"}],"../src/pages/chats/user-profile/user-profile.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "1": function _(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return (stack1 = container.invokePartial(lookupProperty(partials, "profileField"), depth0, {
      "name": "profileField",
      "data": data,
      "indent": "      ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"main--page-user-profile-wrap\">\n" + ((stack1 = container.invokePartial(lookupProperty(partials, "avatar"), depth0 != null ? lookupProperty(depth0, "userpic") : depth0, {
      "name": "avatar",
      "data": data,
      "indent": "    ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "  <div class=\"main--page-user-profile-fields\">\n" + ((stack1 = container.invokePartial(lookupProperty(partials, "heading"), depth0 != null ? lookupProperty(depth0, "username") : depth0, {
      "name": "heading",
      "data": data,
      "indent": "    ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "profileFields") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 4
        },
        "end": {
          "line": 7,
          "column": 13
        }
      }
    })) != null ? stack1 : "") + "  <div class=\"main--page-user-profile-actions\">\n  <a href=\"\" class=\"main--page-user-profile user-profile-link link-change-data\">Изменить данные</a>\n  <a href=\"\" class=\"main--page-user-profile user-profile-link link-change-pass\">Изменить пароль</a>\n  <a href=\"\" class=\"main--page-user-profile user-profile-link link-logout\">Выйти</a>\n  </div>\n    </div> \n</div>";
  },
  "usePartial": true,
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/chats/user-profile/user-profile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProfilePage = addProfilePage;

require("../../../components/profile-field/profile-field");

require("../../../components/avatar/avatar");

require("../../../components/headings/headings");

var _userProfile = _interopRequireDefault(require("./user-profile.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addProfilePage() {
  var profilePageData = {
    userpic: {
      imagesrc: "/noimage.png",
      divclass: "main--page-user-profile user-profile-avatar"
    },
    username: {
      level: '3',
      class: "main--page-user-profile user-profile-heading",
      text: "Иветта Сидорова"
    },
    profileFields: {
      email: {
        label: "E-mail",
        data: "dragonfly@123.com"
      },
      login: {
        label: "Логин",
        data: "dragonfly"
      },
      firstname: {
        label: "Имя",
        data: "Иветта"
      },
      lastname: {
        label: "Фамилия",
        data: "Сидорова"
      },
      phone: {
        label: "Телефон",
        data: "+7 (000)-000-00-00"
      }
    }
  };
  document.querySelector('.chat--wrap').innerHTML = (0, _userProfile.default)(profilePageData);
}

;
},{"../../../components/profile-field/profile-field":"../src/components/profile-field/profile-field.js","../../../components/avatar/avatar":"../src/components/avatar/avatar.js","../../../components/headings/headings":"../src/components/headings/headings.js","./user-profile.hbs":"../src/pages/chats/user-profile/user-profile.hbs"}],"../src/modules/user-profile-form/user-profile-form.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "1": function _(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return (stack1 = container.invokePartial(lookupProperty(partials, "textInput"), depth0, {
      "name": "textInput",
      "data": data,
      "indent": "      ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return ((stack1 = container.invokePartial(lookupProperty(partials, "heading"), depth0 != null ? lookupProperty(depth0, "heading") : depth0, {
      "name": "heading",
      "data": data,
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "  <div class=\"main--page-user-profile-form\">\n  <form action=\"\" class=\"" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "formclass") || (depth0 != null ? lookupProperty(depth0, "formclass") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
      "name": "formclass",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 25
        },
        "end": {
          "line": 3,
          "column": 38
        }
      }
    }) : helper)) + "\" enctype=\"multipart/form-data\">\n" + ((stack1 = lookupProperty(helpers, "each").call(alias1, depth0 != null ? lookupProperty(depth0, "textInputs") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 4,
          "column": 4
        },
        "end": {
          "line": 6,
          "column": 13
        }
      }
    })) != null ? stack1 : "") + ((stack1 = container.invokePartial(lookupProperty(partials, "submit"), depth0 != null ? lookupProperty(depth0, "submit") : depth0, {
      "name": "submit",
      "data": data,
      "indent": "    ",
      "helpers": helpers,
      "partials": partials,
      "decorators": container.decorators
    })) != null ? stack1 : "") + "    </form>\n</div>\n\n";
  },
  "usePartial": true,
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/modules/user-profile-form/user-profile-form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProfileFormPage = addProfileFormPage;
exports.addProfileFormPasswordPage = addProfileFormPasswordPage;

require("../../components/buttons/submit-button");

require("../../components/headings/headings");

require("../../components/inputs/text-input");

var _userProfileForm = _interopRequireDefault(require("./user-profile-form.hbs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addProfileFormPage() {
  var profileFormData = {
    heading: {
      level: '3',
      class: "",
      text: "Изменить данные"
    },
    formclass: "form--user-profile-info",
    textInputs: {
      email: {
        label: "E-mail",
        type: "email",
        name: "email",
        placeholder: "dragonfly@123.com"
      },
      login: {
        label: "Логин",
        type: "text",
        name: "login",
        placeholder: "dragonfly"
      },
      firstname: {
        label: "Имя",
        type: "text",
        name: "first_name",
        placeholder: "Иветта"
      },
      lastname: {
        label: "Фамилия",
        type: "text",
        name: "second_name",
        placeholder: "Сидорова"
      },
      displayname: {
        label: "Имя в чате",
        type: "text",
        name: "display_name",
        placeholder: "Иветта Сидорова"
      },
      phone: {
        label: "Телефон",
        type: "tel",
        name: "phone",
        placeholder: "+7 (000)-000-00-00"
      }
    },
    submit: {
      class: "form--user-profile-info-submit",
      name: "user-profile-штащ-submit",
      title: "Cохранить"
    }
  };
  document.querySelector('.main--page-user-profile-fields').innerHTML = (0, _userProfileForm.default)(profileFormData);
}

function addProfileFormPasswordPage() {
  var profileFormData = {
    heading: {
      level: '3',
      class: "",
      text: "Изменить пароль"
    },
    form: "form--user-profile-password",
    textInputs: {
      currentpassword: {
        label: "Текущий пароль",
        type: "password",
        name: "current-password",
        placeholder: "***********",
        req: "required"
      },
      password: {
        label: "Пароль",
        type: "password",
        name: "password",
        placeholder: "***********",
        req: "required"
      },
      passwordrepeat: {
        label: "Повторите пароль",
        type: "password",
        name: "repeat-password",
        placeholder: "***********",
        req: "required"
      }
    },
    submit: {
      class: "form--user-profile-password-submit",
      name: "user-profile-password-submit",
      title: "Изменить"
    }
  };
  document.querySelector('.main--page-user-profile-fields').innerHTML = (0, _userProfileForm.default)(profileFormData);
}
},{"../../components/buttons/submit-button":"../src/components/buttons/submit-button.js","../../components/headings/headings":"../src/components/headings/headings.js","../../components/inputs/text-input":"../src/components/inputs/text-input.js","./user-profile-form.hbs":"../src/modules/user-profile-form/user-profile-form.hbs"}],"../src/index.js":[function(require,module,exports) {
"use strict";

require("./style.pcss");

var _login = require("../src/pages/chats/login/login");

var _register = require("../src/pages/chats/register/register");

var _main = require("../src/pages/chats/main/main");

var _userProfile = require("./pages/chats/user-profile/user-profile");

var profile = _interopRequireWildcard(require("../src/modules/user-profile-form/user-profile-form"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

document.addEventListener('DOMContentLoaded', function () {
  (0, _login.addLoginPage)();
  var regLink = document.querySelector('.form--login-register-link');
  regLink.addEventListener("click", function (e) {
    e.preventDefault();
    (0, _register.addRegisterPage)();
  });
  document.addEventListener("submit", function (e) {
    e.preventDefault();
    var target = e.target;
    var loginForm = document.querySelector('.form--login');
    var regForm = document.querySelector('.form--register');

    if (target == loginForm || target == regForm) {
      (0, _main.addMainPage)();
      document.addEventListener("click", function (e) {
        e.preventDefault();
        var target = e.target;
        var userAvatar = document.querySelector('.profile-card-avatar img');

        if (target == userAvatar) {
          (0, _userProfile.addProfilePage)();
          document.addEventListener("click", function (e) {
            e.preventDefault();
            var target = e.target;
            console.log(target);
            var changeData = document.querySelector('.link-change-data');
            var changePassw = document.querySelector('.link-change-pass');
            var logOut = document.querySelector('.link-logout');

            if (target == changeData) {
              profile.addProfileFormPage();
            } else if (target == changePassw) {
              profile.addProfileFormPasswordPage();
            } else if (target == logOut) {
              (0, _main.addMainPage)();
            }
          });
        }
      });
    }
  });
});
},{"./style.pcss":"../src/style.pcss","../src/pages/chats/login/login":"../src/pages/chats/login/login.js","../src/pages/chats/register/register":"../src/pages/chats/register/register.js","../src/pages/chats/main/main":"../src/pages/chats/main/main.js","./pages/chats/user-profile/user-profile":"../src/pages/chats/user-profile/user-profile.js","../src/modules/user-profile-form/user-profile-form":"../src/modules/user-profile-form/user-profile-form.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50983" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.js"], null)
//# sourceMappingURL=/src.7ed060e2.js.map