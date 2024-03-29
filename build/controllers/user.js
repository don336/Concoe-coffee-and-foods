'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));
var _bcrypt = _interopRequireDefault(require('bcrypt'));
var _uuid = require('uuid');
var _user = _interopRequireDefault(require('../model/user'));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function _regeneratorRuntime() {
  'use strict';
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return exports;
    };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty =
      Object.defineProperty ||
      function (obj, key, desc) {
        obj[key] = desc.value;
      },
    $Symbol = 'function' == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || '@@iterator',
    asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator',
    toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';
  function define(obj, key, value) {
    return (
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      obj[key]
    );
  }
  try {
    define({}, '');
  } catch (err) {
    define = function define(obj, key, value) {
      return (obj[key] = value);
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator =
        outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return (
      defineProperty(generator, '_invoke', {
        value: makeInvokeMethod(innerFn, self, context),
      }),
      generator
    );
  }
  function tryCatch(fn, obj, arg) {
    try {
      return { type: 'normal', arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: 'throw', arg: err };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype &&
    NativeIteratorPrototype !== Op &&
    hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
    (IteratorPrototype = NativeIteratorPrototype);
  var Gp =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(IteratorPrototype));
  function defineIteratorMethods(prototype) {
    ['next', 'throw', 'return'].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ('throw' !== record.type) {
        var result = record.arg,
          value = result.value;
        return value &&
          'object' == _typeof(value) &&
          hasOwn.call(value, '__await')
          ? PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke('next', value, resolve, reject);
              },
              function (err) {
                invoke('throw', err, resolve, reject);
              }
            )
          : PromiseImpl.resolve(value).then(
              function (unwrapped) {
                (result.value = unwrapped), resolve(result);
              },
              function (error) {
                return invoke('throw', error, resolve, reject);
              }
            );
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, '_invoke', {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return (previousPromise = previousPromise
          ? previousPromise.then(
              callInvokeWithMethodAndArg,
              callInvokeWithMethodAndArg
            )
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = 'suspendedStart';
    return function (method, arg) {
      if ('executing' === state)
        throw new Error('Generator is already running');
      if ('completed' === state) {
        if ('throw' === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ('next' === context.method)
          context.sent = context._sent = context.arg;
        else if ('throw' === context.method) {
          if ('suspendedStart' === state)
            throw ((state = 'completed'), context.arg);
          context.dispatchException(context.arg);
        } else
          'return' === context.method && context.abrupt('return', context.arg);
        state = 'executing';
        var record = tryCatch(innerFn, self, context);
        if ('normal' === record.type) {
          if (
            ((state = context.done ? 'completed' : 'suspendedYield'),
            record.arg === ContinueSentinel)
          )
            continue;
          return { value: record.arg, done: context.done };
        }
        'throw' === record.type &&
          ((state = 'completed'),
          (context.method = 'throw'),
          (context.arg = record.arg));
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method)
      return (
        (context.delegate = null),
        ('throw' === methodName &&
          delegate.iterator['return'] &&
          ((context.method = 'return'),
          (context.arg = undefined),
          maybeInvokeDelegate(delegate, context),
          'throw' === context.method)) ||
          ('return' !== methodName &&
            ((context.method = 'throw'),
            (context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            )))),
        ContinueSentinel
      );
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ('throw' === record.type)
      return (
        (context.method = 'throw'),
        (context.arg = record.arg),
        (context.delegate = null),
        ContinueSentinel
      );
    var info = record.arg;
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
          'return' !== context.method &&
            ((context.method = 'next'), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = 'throw'),
        (context.arg = new TypeError('iterator result is not an object')),
        (context.delegate = null),
        ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    1 in locs && (entry.catchLoc = locs[1]),
      2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
      this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    (record.type = 'normal'), delete record.arg, (entry.completion = record);
  }
  function Context(tryLocsList) {
    (this.tryEntries = [{ tryLoc: 'root' }]),
      tryLocsList.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ('function' == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; )
              if (hasOwn.call(iterable, i))
                return (next.value = iterable[i]), (next.done = !1), next;
            return (next.value = undefined), (next.done = !0), next;
          };
        return (next.next = next);
      }
    }
    return { next: doneResult };
  }
  function doneResult() {
    return { value: undefined, done: !0 };
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    defineProperty(Gp, 'constructor', {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    defineProperty(GeneratorFunctionPrototype, 'constructor', {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      'GeneratorFunction'
    )),
    (exports.isGeneratorFunction = function (genFun) {
      var ctor = 'function' == typeof genFun && genFun.constructor;
      return (
        !!ctor &&
        (ctor === GeneratorFunction ||
          'GeneratorFunction' === (ctor.displayName || ctor.name))
      );
    }),
    (exports.mark = function (genFun) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
          : ((genFun.__proto__ = GeneratorFunctionPrototype),
            define(genFun, toStringTagSymbol, 'GeneratorFunction')),
        (genFun.prototype = Object.create(Gp)),
        genFun
      );
    }),
    (exports.awrap = function (arg) {
      return { __await: arg };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function (
      innerFn,
      outerFn,
      self,
      tryLocsList,
      PromiseImpl
    ) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
    }),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, 'Generator'),
    define(Gp, iteratorSymbol, function () {
      return this;
    }),
    define(Gp, 'toString', function () {
      return '[object Generator]';
    }),
    (exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return (
        keys.reverse(),
        function next() {
          for (; keys.length; ) {
            var key = keys.pop();
            if (key in object)
              return (next.value = key), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (exports.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = undefined),
          (this.done = !1),
          (this.delegate = null),
          (this.method = 'next'),
          (this.arg = undefined),
          this.tryEntries.forEach(resetTryEntry),
          !skipTempReset)
        )
          for (var name in this)
            't' === name.charAt(0) &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1)) &&
              (this[name] = undefined);
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ('throw' === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return (
            (record.type = 'throw'),
            (record.arg = exception),
            (context.next = loc),
            caught && ((context.method = 'next'), (context.arg = undefined)),
            !!caught
          );
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ('root' === entry.tryLoc) return handle('end');
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, 'catchLoc'),
              hasFinally = hasOwn.call(entry, 'finallyLoc');
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally)
                throw new Error('try statement without catch or finally');
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (
            entry.tryLoc <= this.prev &&
            hasOwn.call(entry, 'finallyLoc') &&
            this.prev < entry.finallyLoc
          ) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry &&
          ('break' === type || 'continue' === type) &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc &&
          (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return (
          (record.type = type),
          (record.arg = arg),
          finallyEntry
            ? ((this.method = 'next'),
              (this.next = finallyEntry.finallyLoc),
              ContinueSentinel)
            : this.complete(record)
        );
      },
      complete: function complete(record, afterLoc) {
        if ('throw' === record.type) throw record.arg;
        return (
          'break' === record.type || 'continue' === record.type
            ? (this.next = record.arg)
            : 'return' === record.type
            ? ((this.rval = this.arg = record.arg),
              (this.method = 'return'),
              (this.next = 'end'))
            : 'normal' === record.type && afterLoc && (this.next = afterLoc),
          ContinueSentinel
        );
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc)
            return (
              this.complete(entry.completion, entry.afterLoc),
              resetTryEntry(entry),
              ContinueSentinel
            );
        }
      },
      catch: function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ('throw' === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error('illegal catch attempt');
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return (
          (this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc,
          }),
          'next' === this.method && (this.arg = undefined),
          ContinueSentinel
        );
      },
    }),
    exports
  );
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return _typeof(key) === 'symbol' ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default');
    if (_typeof(res) !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
var UserController = /*#__PURE__*/ (function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }
  _createClass(UserController, null, [
    {
      key: 'registeration',
      value: (function () {
        var _registeration = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(req, res) {
            var _req$body,
              name,
              username,
              email,
              password,
              existingEmail,
              existingUsername,
              salt,
              encryptedPwd,
              user,
              accessToken;
            return _regeneratorRuntime().wrap(
              function _callee$(_context) {
                while (1)
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (_req$body = req.body),
                        (name = _req$body.name),
                        (username = _req$body.username),
                        (email = _req$body.email),
                        (password = _req$body.password);
                      if (!(!name || !username || !email || !password)) {
                        _context.next = 3;
                        break;
                      }
                      return _context.abrupt(
                        'return',
                        res.status(422).json({
                          message: 'Please fillout the required fields',
                        })
                      );
                    case 3:
                      _context.next = 5;
                      return _user['default'].findOne({
                        email: email,
                      });
                    case 5:
                      existingEmail = _context.sent;
                      if (!existingEmail) {
                        _context.next = 8;
                        break;
                      }
                      return _context.abrupt(
                        'return',
                        res.status(409).json({
                          message: 'Email has been taken',
                        })
                      );
                    case 8:
                      _context.next = 10;
                      return _user['default'].findOne({
                        username: username,
                      });
                    case 10:
                      existingUsername = _context.sent;
                      if (!existingUsername) {
                        _context.next = 13;
                        break;
                      }
                      return _context.abrupt(
                        'return',
                        res.status(409).json({
                          message: 'Username has been taken',
                        })
                      );
                    case 13:
                      _context.next = 15;
                      return _bcrypt['default'].genSalt(10);
                    case 15:
                      salt = _context.sent;
                      _context.next = 18;
                      return _bcrypt['default'].hash(password, salt);
                    case 18:
                      encryptedPwd = _context.sent;
                      _context.prev = 19;
                      _context.next = 22;
                      return _user['default'].create({
                        id: (0, _uuid.v4)(),
                        name: name,
                        username: username,
                        email: email,
                        password: encryptedPwd,
                      });
                    case 22:
                      user = _context.sent;
                      _context.next = 25;
                      return _jsonwebtoken['default'].sign(
                        {
                          _id: user.id,
                        },
                        process.env.TOKEN_SECRET
                      );
                    case 25:
                      accessToken = _context.sent;
                      res.cookie('token', accessToken, {
                        expire: new Date() + 1,
                      });
                      return _context.abrupt(
                        'return',
                        res.status(201).json({
                          message: 'User Registered!',
                          accessToken: accessToken,
                          user: user,
                        })
                      );
                    case 30:
                      _context.prev = 30;
                      _context.t0 = _context['catch'](19);
                      return _context.abrupt(
                        'return',
                        res.status(400).json({
                          msg: _context.t0.message,
                        })
                      );
                    case 33:
                    case 'end':
                      return _context.stop();
                  }
              },
              _callee,
              null,
              [[19, 30]]
            );
          })
        );
        function registeration(_x, _x2) {
          return _registeration.apply(this, arguments);
        }
        return registeration;
      })(),
    },
    {
      key: 'signIn',
      value: (function () {
        var _signIn = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(req, res) {
            var _req$body2,
              email,
              password,
              existingUser,
              passVerif,
              accessToken,
              _id,
              username;
            return _regeneratorRuntime().wrap(
              function _callee2$(_context2) {
                while (1)
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      _context2.prev = 0;
                      (_req$body2 = req.body),
                        (email = _req$body2.email),
                        (password = _req$body2.password);
                      if (!(!email || !password)) {
                        _context2.next = 4;
                        break;
                      }
                      return _context2.abrupt(
                        'return',
                        res.status(422).json({
                          message: 'Please fillout all necessary fields',
                        })
                      );
                    case 4:
                      _context2.next = 6;
                      return _user['default'].findOne({
                        email: email,
                      });
                    case 6:
                      existingUser = _context2.sent;
                      if (existingUser) {
                        _context2.next = 9;
                        break;
                      }
                      return _context2.abrupt(
                        'return',
                        res.status(400).json({
                          message:
                            'User not found please register and try again',
                        })
                      );
                    case 9:
                      _context2.next = 11;
                      return _bcrypt['default'].compare(
                        password,
                        existingUser.password
                      );
                    case 11:
                      passVerif = _context2.sent;
                      if (passVerif) {
                        _context2.next = 14;
                        break;
                      }
                      return _context2.abrupt(
                        'return',
                        res.status(401).json({
                          message: 'Please Check Password and try again',
                        })
                      );
                    case 14:
                      _context2.next = 16;
                      return _jsonwebtoken['default'].sign(
                        {
                          _id: existingUser.id,
                        },
                        process.env.TOKEN_SECRET
                      );
                    case 16:
                      accessToken = _context2.sent;
                      res.cookie('token', accessToken, {
                        expire: new Date() + 1,
                      });
                      (_id = existingUser._id),
                        (username = existingUser.username);
                      return _context2.abrupt(
                        'return',
                        res.status(201).json({
                          message: "You're logged in",
                          accessToken: accessToken,
                          user: {
                            _id: _id,
                            username: username,
                            email: email,
                          },
                        })
                      );
                    case 22:
                      _context2.prev = 22;
                      _context2.t0 = _context2['catch'](0);
                      return _context2.abrupt(
                        'return',
                        res.status(500).json({
                          message: 'server error',
                          error: _context2.t0.message,
                        })
                      );
                    case 25:
                    case 'end':
                      return _context2.stop();
                  }
              },
              _callee2,
              null,
              [[0, 22]]
            );
          })
        );
        function signIn(_x3, _x4) {
          return _signIn.apply(this, arguments);
        }
        return signIn;
      })(),
    },
  ]);
  return UserController;
})();
var _default = UserController;
exports['default'] = _default;
