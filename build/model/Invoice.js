"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var invoiceSchema = new _mongoose["default"].connect({
  title: {
    type: String
  },
  description: {
    type: String
  }
});
var _default = _mongoose["default"].model("Invoice", invoiceSchema);
exports["default"] = _default;