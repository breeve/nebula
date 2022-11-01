"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _socketTask = new WeakMap();

var WebSocket = /*#__PURE__*/function () {
  // The connection is not yet open.
  // The connection is open and ready to communicate.
  // The connection is in the process of closing.
  // The connection is closed or couldn't be opened.
  // TODO 更新 binaryType
  // TODO 更新 bufferedAmount
  // TODO 小程序内目前获取不到，实际上需要根据服务器选择的 sub-protocol 返回
  function WebSocket(url, protocols) {
    var _this = this;

    if (protocols === void 0) {
      protocols = [];
    }

    this.binaryType = '';
    this.bufferedAmount = 0;
    this.extensions = '';
    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    this.onopen = null;
    this.protocol = '';
    this.readyState = 3;

    if (typeof url !== 'string' || !/(^ws:\/\/)|(^wss:\/\/)/.test(url)) {
      throw new TypeError("Failed to construct 'WebSocket': The URL '" + url + "' is invalid");
    }

    this.url = url;
    this.readyState = WebSocket.CONNECTING;
    var socketTask = wx.connectSocket({
      url: url,
      protocols: Array.isArray(protocols) ? protocols : [protocols],
      tcpNoDelay: true
    });

    _socketTask.set(this, socketTask);

    socketTask.onClose(function (res) {
      _this.readyState = WebSocket.CLOSED;

      if (typeof _this.onclose === 'function') {
        _this.onclose(res);
      }
    });
    socketTask.onMessage(function (res) {
      if (typeof _this.onmessage === 'function') {
        _this.onmessage(res);
      }
    });
    socketTask.onOpen(function () {
      _this.readyState = WebSocket.OPEN;

      if (typeof _this.onopen === 'function') {
        _this.onopen();
      }
    });
    socketTask.onError(function (res) {
      if (typeof _this.onerror === 'function') {
        _this.onerror(new Error(res.errMsg));
      }
    });
    return this;
  }

  var _proto = WebSocket.prototype;

  _proto.close = function close(code, reason) {
    this.readyState = WebSocket.CLOSING;

    var socketTask = _socketTask.get(this);

    socketTask.close({
      code: code,
      reason: reason
    });
  };

  _proto.send = function send(data) {
    if (typeof data !== 'string' && !(data instanceof ArrayBuffer) && !ArrayBuffer.isView(data)) {
      throw new TypeError("Failed to send message: The data " + data + " is invalid");
    }

    var socketTask = _socketTask.get(this);

    socketTask.send({
      data: data
    });
  };

  return WebSocket;
}();

exports["default"] = WebSocket;
WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;
module.exports = exports.default;