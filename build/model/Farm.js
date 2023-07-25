'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var farmSchema = new mongoose.connect({
  location: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  climate: {
    type: String,
    required: true,
  },
});
var _default = mongoose.model('Farm', farmSchema);
exports['default'] = _default;
