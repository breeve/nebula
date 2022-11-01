"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _HTMLElement2 = _interopRequireDefault(require("./HTMLElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HTMLMediaElement = /*#__PURE__*/function (_HTMLElement) {
  _inheritsLoose(HTMLMediaElement, _HTMLElement);

  function HTMLMediaElement(type) {
    return _HTMLElement.call(this, type) || this;
  }

  var _proto = HTMLMediaElement.prototype;

  _proto.addTextTrack = function addTextTrack() {};

  _proto.captureStream = function captureStream() {};

  _proto.fastSeek = function fastSeek() {};

  _proto.load = function load() {};

  _proto.pause = function pause() {};

  _proto.play = function play() {};

  return HTMLMediaElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLMediaElement;
module.exports = exports.default;