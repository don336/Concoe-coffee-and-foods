'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var _mongoose = _interopRequireDefault(require('mongoose'));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var orderSchema = new _mongoose['default'].connect({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orderItems: {
    type: [],
  },
  orderTotal: {
    type: Number,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});
var _default = _mongoose['default'].model('Order', orderSchema);
exports['default'] = _default;
