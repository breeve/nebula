"use strict";

exports.__esModule = true;
exports["default"] = _default;

var _HTMLImageElement = _interopRequireDefault(require("./HTMLImageElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  var image = wx.createImage(); // image.__proto__.__proto__.__proto__ = new HTMLImageElement();

  image.premultiplyAlpha = false;
  return image;
}

;
module.exports = exports.default;