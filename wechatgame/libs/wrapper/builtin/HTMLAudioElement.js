"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _HTMLMediaElement2 = _interopRequireDefault(require("./HTMLMediaElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HTMLAudioElement = /*#__PURE__*/function (_HTMLMediaElement) {
  _inheritsLoose(HTMLAudioElement, _HTMLMediaElement);

  function HTMLAudioElement() {
    return _HTMLMediaElement.call(this, 'audio') || this;
  }

  return HTMLAudioElement;
}(_HTMLMediaElement2["default"]);

exports["default"] = HTMLAudioElement;
module.exports = exports.default;