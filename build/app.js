"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("./db/mongoose"));
var _celebrate = require("celebrate");
var _index = _interopRequireDefault(require("./routes/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _mongoose["default"])();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _celebrate.errors)());
app.use(_index["default"]);
app.get("/", function (req, res) {
  return res.status(200).send("Home");
});
app.use(function (req, res) {
  return res.status(404).json({
    message: "resource not found"
  });
});
var _default = app;
exports["default"] = _default;