"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Element2 = _interopRequireDefault(require("./Element"));

var _index = require("./util/index.js");

var _WindowProperties = require("./WindowProperties");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HTMLElement = /*#__PURE__*/function (_Element) {
  _inheritsLoose(HTMLElement, _Element);

  function HTMLElement(tagName) {
    var _this;

    if (tagName === void 0) {
      tagName = '';
    }

    _this = _Element.call(this) || this;
    _this.className = '';
    _this.childern = [];
    _this.style = {
      width: _WindowProperties.innerWidth + "px",
      height: _WindowProperties.innerHeight + "px"
    };
    _this.insertBefore = _index.noop;
    _this.innerHTML = '';
    _this.tagName = tagName.toUpperCase();
    return _this;
  }

  var _proto = HTMLElement.prototype;

  _proto.setAttribute = function setAttribute(name, value) {
    this[name] = value;
  };

  _proto.getAttribute = function getAttribute(name) {
    return this[name];
  };

  _proto.getBoundingClientRect = function getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: _WindowProperties.innerWidth,
      height: _WindowProperties.innerHeight
    };
  };

  _proto.focus = function focus() {};

  _createClass(HTMLElement, [{
    key: "clientWidth",
    get: function get() {
      var ret = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
      return Number.isNaN(ret) ? 0 : ret;
    }
  }, {
    key: "clientHeight",
    get: function get() {
      var ret = parseInt(this.style.fontSize, 10);
      return Number.isNaN(ret) ? 0 : ret;
    }
  }]);

  return HTMLElement;
}(_Element2["default"]);

exports["default"] = HTMLElement;
module.exports = exports.default;