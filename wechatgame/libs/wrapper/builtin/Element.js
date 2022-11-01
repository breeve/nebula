"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Node2 = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Element, _Node);

  function Element() {
    var _this;

    _this = _Node.call(this) || this;
    _this.className = '';
    _this.children = [];
    return _this;
  }

  return Element;
}(_Node2["default"]);

exports["default"] = Element;
module.exports = exports.default;