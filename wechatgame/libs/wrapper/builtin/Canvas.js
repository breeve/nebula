"use strict";

exports.__esModule = true;
exports["default"] = Canvas;

var _WindowProperties = require("./WindowProperties");

// import HTMLCanvasElement from './HTMLCanvasElement'
var hasModifiedCanvasPrototype = false;
var hasInit2DContextConstructor = false;
var hasInitWebGLContextConstructor = false;

function Canvas() {
  var canvas = wx.createCanvas();
  canvas.type = 'canvas'; // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

  var _getContext = canvas.getContext;

  canvas.getBoundingClientRect = function () {
    var ret = {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
    return ret;
  };

  canvas.style = {
    top: '0px',
    left: '0px',
    width: _WindowProperties.innerWidth + 'px',
    height: _WindowProperties.innerHeight + 'px'
  };

  canvas.addEventListener = function (type, listener, options) {
    if (options === void 0) {
      options = {};
    }

    // console.log('canvas.addEventListener', type);
    document.addEventListener(type, listener, options);
  };

  canvas.removeEventListener = function (type, listener) {
    // console.log('canvas.removeEventListener', type);
    document.removeEventListener(type, listener);
  };

  canvas.dispatchEvent = function (event) {
    if (event === void 0) {
      event = {};
    }

    console.log('canvas.dispatchEvent', event.type, event); // nothing to do
  };

  Object.defineProperty(canvas, 'clientWidth', {
    enumerable: true,
    get: function get() {
      return _WindowProperties.innerWidth;
    }
  });
  Object.defineProperty(canvas, 'clientHeight', {
    enumerable: true,
    get: function get() {
      return _WindowProperties.innerHeight;
    }
  });
  return canvas;
}

module.exports = exports.default;