'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var _user = _interopRequireDefault(require('../../controllers/user'));
var _express = require('express');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var userRoute = (0, _express.Router)();
userRoute.post('/signup', _user['default'].registeration);
userRoute.post('/signin', _user['default'].signIn);
var _default = userRoute;
exports['default'] = _default;
