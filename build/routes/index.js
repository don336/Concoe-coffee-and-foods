"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _apiV = _interopRequireDefault(require("./api-v1"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.use("/api/v1/", _apiV["default"]);
var _default = routes;
exports["default"] = _default;