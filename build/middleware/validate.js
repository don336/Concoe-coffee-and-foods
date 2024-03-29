'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var _celebrate3 = require('celebrate');
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
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
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
var validate = /*#__PURE__*/ _createClass(function validate() {
  _classCallCheck(this, validate);
});
exports['default'] = validate;
_defineProperty(
  validate,
  'userRegistration',
  (0, _celebrate3.celebrate)(
    _defineProperty(
      {},
      _celebrate3.Segments.BODY,
      _celebrate3.Joi.object().keys({
        name: _celebrate3.Joi.string().min(6).required(),
        username: _celebrate3.Joi.string().min(3).max(32).required(),
        email: _celebrate3.Joi.string().min(6).max(255).required().email(),
        password: _celebrate3.Joi.string().min(8).max(127).required(),
      })
    )
  )
);
_defineProperty(
  validate,
  'signIn',
  (0, _celebrate3.celebrate)(
    _defineProperty(
      {},
      _celebrate3.Segments.BODY,
      _celebrate3.Joi.object().keys({
        email: _celebrate3.Joi.string().min(3).max(320).required().email(),
        password: _celebrate3.Joi.string().min(8).max(127).required(),
      })
    )
  )
);
