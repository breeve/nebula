"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _util = require("./util");

var Event = function Event(type) {
  this.cancelBubble = false;
  this.cancelable = false;
  this.target = null;
  this.timestampe = Date.now();
  this.preventDefault = _util.noop;
  this.stopPropagation = _util.noop;
  this.type = type;
};

exports["default"] = Event;
module.exports = exports.default;