"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var feedbackSchema = new mongoose.connect({
  title: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  }
});
var _default = mongoose.model("FeedBack", feedbackSchema);
exports["default"] = _default;