"use strict";

exports.__esModule = true;
var _exportNames = {
  TouchEvent: true,
  MouseEvent: true,
  DeviceMotionEvent: true,
  canvas: true,
  setTimeout: true,
  setInterval: true,
  clearTimeout: true,
  clearInterval: true,
  requestAnimationFrame: true,
  cancelAnimationFrame: true,
  navigator: true,
  XMLHttpRequest: true,
  WebSocket: true,
  Image: true,
  ImageBitmap: true,
  Audio: true,
  FileReader: true,
  HTMLElement: true,
  HTMLImageElement: true,
  HTMLCanvasElement: true,
  HTMLMediaElement: true,
  HTMLAudioElement: true,
  HTMLVideoElement: true,
  WebGLRenderingContext: true,
  localStorage: true,
  location: true
};
exports.cancelAnimationFrame = exports.requestAnimationFrame = exports.clearInterval = exports.clearTimeout = exports.setInterval = exports.setTimeout = exports.canvas = exports.DeviceMotionEvent = exports.MouseEvent = exports.TouchEvent = void 0;

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _navigator2 = _interopRequireDefault(require("./navigator"));

exports.navigator = _navigator2["default"];

var _XMLHttpRequest2 = _interopRequireDefault(require("./XMLHttpRequest"));

exports.XMLHttpRequest = _XMLHttpRequest2["default"];

var _WebSocket2 = _interopRequireDefault(require("./WebSocket"));

exports.WebSocket = _WebSocket2["default"];

var _Image2 = _interopRequireDefault(require("./Image"));

exports.Image = _Image2["default"];

var _ImageBitmap2 = _interopRequireDefault(require("./ImageBitmap"));

exports.ImageBitmap = _ImageBitmap2["default"];

var _Audio2 = _interopRequireDefault(require("./Audio"));

exports.Audio = _Audio2["default"];

var _FileReader2 = _interopRequireDefault(require("./FileReader"));

exports.FileReader = _FileReader2["default"];

var _HTMLElement2 = _interopRequireDefault(require("./HTMLElement"));

exports.HTMLElement = _HTMLElement2["default"];

var _HTMLImageElement2 = _interopRequireDefault(require("./HTMLImageElement"));

exports.HTMLImageElement = _HTMLImageElement2["default"];

var _HTMLCanvasElement2 = _interopRequireDefault(require("./HTMLCanvasElement"));

exports.HTMLCanvasElement = _HTMLCanvasElement2["default"];

var _HTMLMediaElement2 = _interopRequireDefault(require("./HTMLMediaElement"));

exports.HTMLMediaElement = _HTMLMediaElement2["default"];

var _HTMLAudioElement2 = _interopRequireDefault(require("./HTMLAudioElement"));

exports.HTMLAudioElement = _HTMLAudioElement2["default"];

var _HTMLVideoElement2 = _interopRequireDefault(require("./HTMLVideoElement"));

exports.HTMLVideoElement = _HTMLVideoElement2["default"];

var _WebGLRenderingContext2 = _interopRequireDefault(require("./WebGLRenderingContext"));

exports.WebGLRenderingContext = _WebGLRenderingContext2["default"];

var _index = require("./EventIniter/index.js");

exports.TouchEvent = _index.TouchEvent;
exports.MouseEvent = _index.MouseEvent;
exports.DeviceMotionEvent = _index.DeviceMotionEvent;

var _localStorage2 = _interopRequireDefault(require("./localStorage"));

exports.localStorage = _localStorage2["default"];

var _location2 = _interopRequireDefault(require("./location"));

exports.location = _location2["default"];

var _WindowProperties = require("./WindowProperties");

Object.keys(_WindowProperties).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _WindowProperties[key]) return;
  exports[key] = _WindowProperties[key];
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 暴露全局的 canvas
GameGlobal.screencanvas = GameGlobal.screencanvas || new _Canvas["default"]();
var canvas = GameGlobal.screencanvas;
exports.canvas = canvas;
var _GameGlobal = GameGlobal,
    setTimeout = _GameGlobal.setTimeout,
    setInterval = _GameGlobal.setInterval,
    clearTimeout = _GameGlobal.clearTimeout,
    clearInterval = _GameGlobal.clearInterval,
    requestAnimationFrame = _GameGlobal.requestAnimationFrame,
    cancelAnimationFrame = _GameGlobal.cancelAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;
exports.requestAnimationFrame = requestAnimationFrame;
exports.clearInterval = clearInterval;
exports.clearTimeout = clearTimeout;
exports.setInterval = setInterval;
exports.setTimeout = setTimeout;