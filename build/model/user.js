"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String
  },
  dateCreated: {
    type: Date,
    "default": Date.now,
    immutable: true
  }
});
var _default = _mongoose["default"].model('User', userSchema);
exports["default"] = _default;