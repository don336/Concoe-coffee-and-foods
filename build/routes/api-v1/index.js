"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _user = _interopRequireDefault(require("./user"));
var _express = require("express");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = (0, _express.Router)();
route.use("/auth/", _user["default"]);
var _default = route;
exports["default"] = _default;