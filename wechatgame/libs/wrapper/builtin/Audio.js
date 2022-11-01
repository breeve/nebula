"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _HTMLAudioElement2 = _interopRequireDefault(require("./HTMLAudioElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HAVE_NOTHING = 0;
var HAVE_METADATA = 1;
var HAVE_CURRENT_DATA = 2;
var HAVE_FUTURE_DATA = 3;
var HAVE_ENOUGH_DATA = 4;
var SN_SEED = 1;
var _innerAudioContextMap = {};

var Audio = /*#__PURE__*/function (_HTMLAudioElement) {
  _inheritsLoose(Audio, _HTMLAudioElement);

  function Audio(url) {
    var _this;

    _this = _HTMLAudioElement.call(this) || this;
    _this._$sn = SN_SEED++;
    _this.HAVE_NOTHING = HAVE_NOTHING;
    _this.HAVE_METADATA = HAVE_METADATA;
    _this.HAVE_CURRENT_DATA = HAVE_CURRENT_DATA;
    _this.HAVE_FUTURE_DATA = HAVE_FUTURE_DATA;
    _this.HAVE_ENOUGH_DATA = HAVE_ENOUGH_DATA;
    _this.readyState = HAVE_NOTHING;
    var innerAudioContext = wx.createInnerAudioContext();
    _innerAudioContextMap[_this._$sn] = innerAudioContext;
    _this._canplayEvents = ['load', 'loadend', 'canplay', 'canplaythrough', 'loadedmetadata'];
    innerAudioContext.onCanplay(function () {
      _this._loaded = true;
      _this.readyState = _this.HAVE_CURRENT_DATA;

      _this._canplayEvents.forEach(function (type) {
        _this.dispatchEvent({
          type: type
        });
      });
    });
    innerAudioContext.onPlay(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      _this.dispatchEvent({
        type: 'play'
      });
    });
    innerAudioContext.onPause(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      _this.dispatchEvent({
        type: 'pause'
      });
    });
    innerAudioContext.onEnded(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      if (_innerAudioContextMap[_this._$sn].loop === false) {
        _this.dispatchEvent({
          type: 'ended'
        });
      }

      _this.readyState = HAVE_ENOUGH_DATA;
    });
    innerAudioContext.onError(function () {
      _this._paused = _innerAudioContextMap[_this._$sn].paused;

      _this.dispatchEvent({
        type: 'error'
      });
    });

    if (url) {
      _this.src = url;
    } else {
      _this._src = '';
    }

    _this._loop = innerAudioContext.loop;
    _this._autoplay = innerAudioContext.autoplay;
    _this._paused = innerAudioContext.paused;
    _this._volume = innerAudioContext.volume;
    _this._muted = false;
    return _this;
  }

  var _proto = Audio.prototype;

  _proto.addEventListener = function addEventListener(type, listener, options) {
    if (options === void 0) {
      options = {};
    }

    _HTMLAudioElement.prototype.addEventListener.call(this, type, listener, options);

    type = String(type).toLowerCase();

    if (this._loaded && this._canplayEvents.indexOf(type) !== -1) {
      this.dispatchEvent({
        type: type
      });
    }
  };

  _proto.load = function load() {// console.warn('HTMLAudioElement.load() is not implemented.')
    // weixin doesn't need call load() manually
  };

  _proto.play = function play() {
    _innerAudioContextMap[this._$sn].play();
  };

  _proto.resume = function resume() {
    _innerAudioContextMap[this._$sn].resume();
  };

  _proto.pause = function pause() {
    _innerAudioContextMap[this._$sn].pause();
  };

  _proto.stop = function stop() {
    _innerAudioContextMap[this._$sn].stop();
  };

  _proto.destroy = function destroy() {
    _innerAudioContextMap[this._$sn].destroy();
  };

  _proto.canPlayType = function canPlayType(mediaType) {
    if (mediaType === void 0) {
      mediaType = '';
    }

    if (typeof mediaType !== 'string') {
      return '';
    }

    if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
      return 'probably';
    }

    return '';
  };

  _proto.cloneNode = function cloneNode() {
    var newAudio = new Audio();
    newAudio.loop = this.loop;
    newAudio.autoplay = this.autoplay;
    newAudio.src = this.src;
    return newAudio;
  };

  _createClass(Audio, [{
    key: "currentTime",
    get: function get() {
      return _innerAudioContextMap[this._$sn].currentTime;
    },
    set: function set(value) {
      _innerAudioContextMap[this._$sn].seek(value);
    }
  }, {
    key: "duration",
    get: function get() {
      return _innerAudioContextMap[this._$sn].duration;
    }
  }, {
    key: "src",
    get: function get() {
      return this._src;
    },
    set: function set(value) {
      this._src = value;
      this._loaded = false;
      this.readyState = this.HAVE_NOTHING;
      var innerAudioContext = _innerAudioContextMap[this._$sn];
      innerAudioContext.src = value;
    }
  }, {
    key: "loop",
    get: function get() {
      return this._loop;
    },
    set: function set(value) {
      this._loop = value;
      _innerAudioContextMap[this._$sn].loop = value;
    }
  }, {
    key: "autoplay",
    get: function get() {
      return this.autoplay;
    },
    set: function set(value) {
      this._autoplay = value;
      _innerAudioContextMap[this._$sn].autoplay = value;
    }
  }, {
    key: "paused",
    get: function get() {
      return this._paused;
    }
  }, {
    key: "volume",
    get: function get() {
      return this._volume;
    },
    set: function set(value) {
      this._volume = value;

      if (!this._muted) {
        _innerAudioContextMap[this._$sn].volume = value;
      }
    }
  }, {
    key: "muted",
    get: function get() {
      return this._muted;
    },
    set: function set(value) {
      this._muted = value;

      if (value) {
        _innerAudioContextMap[this._$sn].volume = 0;
      } else {
        _innerAudioContextMap[this._$sn].volume = this._volume;
      }
    }
  }]);

  return Audio;
}(_HTMLAudioElement2["default"]);

exports["default"] = Audio;
module.exports = exports.default;