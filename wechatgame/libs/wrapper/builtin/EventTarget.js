"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _events = new WeakMap();

var EventTarget = /*#__PURE__*/function () {
  function EventTarget() {
    _events.set(this, {});
  }

  var _proto = EventTarget.prototype;

  _proto.addEventListener = function addEventListener(type, listener, options) {
    if (options === void 0) {
      options = {};
    }

    var events = _events.get(this);

    if (!events) {
      events = {};

      _events.set(this, events);
    }

    if (!events[type]) {
      events[type] = [];
    }

    events[type].push(listener);

    if (options.capture) {// console.warn('EventTarget.addEventListener: options.capture is not implemented.')
    }

    if (options.once) {// console.warn('EventTarget.addEventListener: options.once is not implemented.')
    }

    if (options.passive) {// console.warn('EventTarget.addEventListener: options.passive is not implemented.')
    }
  };

  _proto.removeEventListener = function removeEventListener(type, listener) {
    var events = _events.get(this);

    if (events) {
      var listeners = events[type];

      if (listeners && listeners.length > 0) {
        for (var i = listeners.length; i--; i > 0) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
            break;
          }
        }
      }
    }
  };

  _proto.dispatchEvent = function dispatchEvent(event) {
    if (event === void 0) {
      event = {};
    }

    var listeners = _events.get(this)[event.type];

    if (listeners) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](event);
      }
    }
  };

  return EventTarget;
}();

exports["default"] = EventTarget;
module.exports = exports.default;