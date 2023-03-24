"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var coffeeSchema = new mongoose.connect({
  variety: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  yeild: {
    type: String,
    required: true
  }
});
var _default = mongoose.model("Coffee", coffeeSchema);
exports["default"] = _default;