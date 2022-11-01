"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _EventTarget2 = _interopRequireDefault(require("./EventTarget.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Node = /*#__PURE__*/function (_EventTarget) {
  _inheritsLoose(Node, _EventTarget);

  function Node() {
    var _this;

    _this = _EventTarget.call(this) || this;
    _this.childNodes = [];
    return _this;
  }

  var _proto = Node.prototype;

  _proto.appendChild = function appendChild(node) {
    this.childNodes.push(node); // if (node instanceof Node) {
    //   this.childNodes.push(node)
    // } else {
    //   throw new TypeError('Failed to executed \'appendChild\' on \'Node\': parameter 1 is not of type \'Node\'.')
    // }
  };

  _proto.cloneNode = function cloneNode() {
    var copyNode = Object.create(this);
    Object.assign(copyNode, this);
    return copyNode;
  };

  _proto.removeChild = function removeChild(node) {
    var index = this.childNodes.findIndex(function (child) {
      return child === node;
    });

    if (index > -1) {
      return this.childNodes.splice(index, 1);
    }

    return null;
  };

  return Node;
}(_EventTarget2["default"]);

exports["default"] = Node;
module.exports = exports.default;