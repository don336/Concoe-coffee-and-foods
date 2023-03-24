"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var checkAuth = function checkAuth(req, res, next) {
  var token = req.header('Authentication');
  if (!token) {
    return res.status(401).json({
      msg: 'Auth Denied!'
    });
  }
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};
exports.checkAuth = checkAuth;