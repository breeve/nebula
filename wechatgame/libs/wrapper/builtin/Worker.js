"use strict";

exports.__esModule = true;
exports["default"] = _default;

function _default(file) {
  var worker = wx.createWorker(file);
  return worker;
}

;
module.exports = exports.default;