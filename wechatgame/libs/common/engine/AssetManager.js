"use strict";

var cacheManager = require('../cache-manager');

var _window$fsUtils = window.fsUtils,
    fs = _window$fsUtils.fs,
    downloadFile = _window$fsUtils.downloadFile,
    readText = _window$fsUtils.readText,
    readArrayBuffer = _window$fsUtils.readArrayBuffer,
    readJson = _window$fsUtils.readJson,
    loadSubpackage = _window$fsUtils.loadSubpackage,
    getUserDataPath = _window$fsUtils.getUserDataPath,
    exists = _window$fsUtils.exists;
var REGEX = /^https?:\/\/.*/;
var downloader = cc.assetManager.downloader;
var parser = cc.assetManager.parser;
var presets = cc.assetManager.presets;
downloader.maxConcurrency = 8;
downloader.maxRequestsPerFrame = 64;
presets['scene'].maxConcurrency = 10;
presets['scene'].maxRequestsPerFrame = 64;
var subpackages = {};

function downloadScript(url, options, onComplete) {
  if (REGEX.test(url)) {
    onComplete && onComplete(new Error('Can not load remote scripts'));
  } else {
    require('../../../' + url);

    onComplete && onComplete(null);
  }
}

function handleZip(url, options, onComplete) {
  var cachedUnzip = cacheManager.cachedFiles.get(url);

  if (cachedUnzip) {
    cacheManager.updateLastTime(url);
    onComplete && onComplete(null, cachedUnzip.url);
  } else if (REGEX.test(url)) {
    downloadFile(url, null, options.header, options.onFileProgress, function (err, downloadedZipPath) {
      if (err) {
        onComplete && onComplete(err);
        return;
      }

      cacheManager.unzipAndCacheBundle(url, downloadedZipPath, options.__cacheBundleRoot__, onComplete);
    });
  } else {
    cacheManager.unzipAndCacheBundle(url, url, options.__cacheBundleRoot__, onComplete);
  }
}

function loadInnerAudioContext(url) {
  return new Promise(function (resolve, reject) {
    var nativeAudio = __globalAdapter.createInnerAudioContext();

    var timer = setTimeout(function () {
      clearEvent();
      resolve(nativeAudio);
    }, 8000);

    function clearEvent() {
      nativeAudio.offCanplay(success);
      nativeAudio.offError(fail);
    }

    function success() {
      clearEvent();
      clearTimeout(timer);
      resolve(nativeAudio);
    }

    function fail() {
      clearEvent();
      clearTimeout(timer);
      reject('failed to load innerAudioContext: ' + err);
    }

    nativeAudio.onCanplay(success);
    nativeAudio.onError(fail);
    nativeAudio.src = url;
  });
}

function loadAudioPlayer(url, options, onComplete) {
  cc.AudioPlayer.load(url).then(function (player) {
    var audioMeta = {
      player: player,
      url: url,
      duration: player.duration,
      type: player.type
    };
    onComplete(null, audioMeta);
  })["catch"](function (err) {
    onComplete(err);
  });
}

function download(url, func, options, onFileProgress, onComplete) {
  var result = transformUrl(url, options);

  if (result.inLocal) {
    func(result.url, options, onComplete);
  } else if (result.inCache) {
    cacheManager.updateLastTime(url);
    func(result.url, options, function (err, data) {
      if (err) {
        cacheManager.removeCache(url);
      }

      onComplete(err, data);
    });
  } else {
    downloadFile(url, null, options.header, onFileProgress, function (err, path) {
      if (err) {
        onComplete(err, null);
        return;
      }

      func(path, options, function (err, data) {
        if (!err) {
          cacheManager.tempFiles.add(url, path);
          cacheManager.cacheFile(url, path, options.cacheEnabled, options.__cacheBundleRoot__, true);
        }

        onComplete(err, data);
      });
    });
  }
}

function parseArrayBuffer(url, options, onComplete) {
  readArrayBuffer(url, onComplete);
}

function parseText(url, options, onComplete) {
  readText(url, onComplete);
}

function parseJson(url, options, onComplete) {
  readJson(url, onComplete);
}

function downloadText(url, options, onComplete) {
  download(url, parseText, options, options.onFileProgress, onComplete);
}

function downloadJson(url, options, onComplete) {
  download(url, parseJson, options, options.onFileProgress, onComplete);
}

function downloadArrayBuffer(url, options, onComplete) {
  download(url, parseArrayBuffer, options, options.onFileProgress, onComplete);
}

function loadFont(url, options, onComplete) {
  var fontFamily = __globalAdapter.loadFont(url);

  onComplete(null, fontFamily || 'Arial');
}

function doNothing(content, options, onComplete) {
  exists(content, function (existence) {
    if (existence) {
      onComplete(null, content);
    } else {
      onComplete(new Error("file " + content + " does not exist!"));
    }
  });
}

function downloadAsset(url, options, onComplete) {
  download(url, doNothing, options, options.onFileProgress, onComplete);
}

var downloadCCON = function downloadCCON(url, options, onComplete) {
  downloadJson(url, options, function (err, json) {
    if (err) {
      onComplete(err);
      return;
    }

    var cconPreface = cc.internal.parseCCONJson(json);
    var chunkPromises = Promise.all(cconPreface.chunks.map(function (chunk) {
      return new Promise(function (resolve, reject) {
        downloadArrayBuffer("" + cc.path.mainFileName(url) + chunk, {}, function (errChunk, chunkBuffer) {
          if (errChunk) {
            reject(errChunk);
          } else {
            resolve(new Uint8Array(chunkBuffer));
          }
        });
      });
    }));
    chunkPromises.then(function (chunks) {
      var ccon = new cc.internal.CCON(cconPreface.document, chunks);
      onComplete(null, ccon);
    })["catch"](function (err) {
      onComplete(err);
    });
  });
};

var downloadCCONB = function downloadCCONB(url, options, onComplete) {
  downloadArrayBuffer(url, options, function (err, arrayBuffer) {
    if (err) {
      onComplete(err);
      return;
    }

    try {
      var ccon = cc.internal.decodeCCONBinary(new Uint8Array(arrayBuffer));
      onComplete(null, ccon);
    } catch (err) {
      onComplete(err);
    }
  });
};

function downloadBundle(nameOrUrl, options, onComplete) {
  var bundleName = cc.path.basename(nameOrUrl);
  var version = options.version || cc.assetManager.downloader.bundleVers[bundleName];
  var suffix = version ? version + '.' : '';

  if (subpackages[bundleName]) {
    var config = "subpackages/" + bundleName + "/config." + suffix + "json";
    loadSubpackage(bundleName, options.onFileProgress, function (err) {
      if (err) {
        onComplete(err, null);
        return;
      }

      downloadJson(config, options, function (err, data) {
        data && (data.base = "subpackages/" + bundleName + "/");
        onComplete(err, data);
      });
    });
  } else {
    var js, url;

    if (REGEX.test(nameOrUrl) || nameOrUrl.startsWith(getUserDataPath())) {
      url = nameOrUrl;
      js = "src/bundle-scripts/" + bundleName + "/index." + suffix + "js";
      cacheManager.makeBundleFolder(bundleName);
    } else {
      if (downloader.remoteBundles.indexOf(bundleName) !== -1) {
        url = downloader.remoteServerAddress + "remote/" + bundleName;
        js = "src/bundle-scripts/" + bundleName + "/index." + suffix + "js";
        cacheManager.makeBundleFolder(bundleName);
      } else {
        url = "assets/" + bundleName;
        js = "assets/" + bundleName + "/index." + suffix + "js";
      }
    }

    require('../../../' + js);

    options.__cacheBundleRoot__ = bundleName;
    var config = url + "/config." + suffix + "json";
    downloadJson(config, options, function (err, data) {
      if (err) {
        onComplete && onComplete(err);
        return;
      }

      if (data.isZip) {
        var zipVersion = data.zipVersion;
        var zipUrl = url + "/res." + (zipVersion ? zipVersion + '.' : '') + "zip";
        handleZip(zipUrl, options, function (err, unzipPath) {
          if (err) {
            onComplete && onComplete(err);
            return;
          }

          data.base = unzipPath + '/res/'; // PATCH: for android alipay version before v10.1.95 (v10.1.95 included)
          // to remove in the future

          var sys = cc.sys;

          if (sys.platform === sys.Platform.ALIPAY_MINI_GAME && sys.os === sys.OS.ANDROID) {
            var resPath = unzipPath + 'res/';

            if (fs.accessSync({
              path: resPath
            })) {
              data.base = resPath;
            }
          }

          onComplete && onComplete(null, data);
        });
      } else {
        data.base = url + '/';
        onComplete && onComplete(null, data);
      }
    });
  }
}

;
var originParsePVRTex = parser.parsePVRTex;

var parsePVRTex = function parsePVRTex(file, options, onComplete) {
  readArrayBuffer(file, function (err, data) {
    if (err) return onComplete(err);
    originParsePVRTex(data, options, onComplete);
  });
};

var originParsePKMTex = parser.parsePKMTex;

var parsePKMTex = function parsePKMTex(file, options, onComplete) {
  readArrayBuffer(file, function (err, data) {
    if (err) return onComplete(err);
    originParsePKMTex(data, options, onComplete);
  });
};

var originParseASTCTex = parser.parseASTCTex;

var parseASTCTex = function parseASTCTex(file, options, onComplete) {
  readArrayBuffer(file, function (err, data) {
    if (err) return onComplete(err);
    originParseASTCTex(data, options, onComplete);
  });
};

var originParsePlist = parser.parsePlist;

var parsePlist = function parsePlist(url, options, onComplete) {
  readText(url, function (err, file) {
    if (err) return onComplete(err);
    originParsePlist(file, options, onComplete);
  });
};

downloader.downloadScript = downloadScript;
parser.parsePVRTex = parsePVRTex;
parser.parsePKMTex = parsePKMTex;
parser.parseASTCTex = parseASTCTex;
parser.parsePlist = parsePlist;
downloader.register({
  '.js': downloadScript,
  // Audio
  '.mp3': downloadAsset,
  '.ogg': downloadAsset,
  '.wav': downloadAsset,
  '.m4a': downloadAsset,
  // Image
  '.png': downloadAsset,
  '.jpg': downloadAsset,
  '.bmp': downloadAsset,
  '.jpeg': downloadAsset,
  '.gif': downloadAsset,
  '.ico': downloadAsset,
  '.tiff': downloadAsset,
  '.image': downloadAsset,
  '.webp': downloadAsset,
  '.pvr': downloadAsset,
  '.pkm': downloadAsset,
  '.astc': downloadAsset,
  '.font': downloadAsset,
  '.eot': downloadAsset,
  '.ttf': downloadAsset,
  '.woff': downloadAsset,
  '.svg': downloadAsset,
  '.ttc': downloadAsset,
  '.ccon': downloadCCON,
  '.cconb': downloadCCONB,
  // Txt
  '.txt': downloadAsset,
  '.xml': downloadAsset,
  '.vsh': downloadAsset,
  '.fsh': downloadAsset,
  '.atlas': downloadAsset,
  '.tmx': downloadAsset,
  '.tsx': downloadAsset,
  '.plist': downloadAsset,
  '.fnt': downloadAsset,
  '.json': downloadJson,
  '.ExportJson': downloadAsset,
  '.binary': downloadAsset,
  '.bin': downloadAsset,
  '.dbbin': downloadAsset,
  '.skel': downloadAsset,
  '.mp4': downloadAsset,
  '.avi': downloadAsset,
  '.mov': downloadAsset,
  '.mpg': downloadAsset,
  '.mpeg': downloadAsset,
  '.rm': downloadAsset,
  '.rmvb': downloadAsset,
  'bundle': downloadBundle,
  'default': downloadText
});
parser.register({
  '.png': downloader.downloadDomImage,
  '.jpg': downloader.downloadDomImage,
  '.bmp': downloader.downloadDomImage,
  '.jpeg': downloader.downloadDomImage,
  '.gif': downloader.downloadDomImage,
  '.ico': downloader.downloadDomImage,
  '.tiff': downloader.downloadDomImage,
  '.image': downloader.downloadDomImage,
  '.webp': downloader.downloadDomImage,
  '.pvr': parsePVRTex,
  '.pkm': parsePKMTex,
  '.astc': parseASTCTex,
  '.font': loadFont,
  '.eot': loadFont,
  '.ttf': loadFont,
  '.woff': loadFont,
  '.svg': loadFont,
  '.ttc': loadFont,
  // Audio
  '.mp3': loadAudioPlayer,
  '.ogg': loadAudioPlayer,
  '.wav': loadAudioPlayer,
  '.m4a': loadAudioPlayer,
  // Txt
  '.txt': parseText,
  '.xml': parseText,
  '.vsh': parseText,
  '.fsh': parseText,
  '.atlas': parseText,
  '.tmx': parseText,
  '.tsx': parseText,
  '.fnt': parseText,
  '.plist': parsePlist,
  '.binary': parseArrayBuffer,
  '.bin': parseArrayBuffer,
  '.dbbin': parseArrayBuffer,
  '.skel': parseArrayBuffer,
  '.ExportJson': parseJson
});

function transformUrl(url, options) {
  var inLocal = false;
  var inCache = false;
  var isInUserDataPath = url.startsWith(getUserDataPath());

  if (isInUserDataPath) {
    inLocal = true;
  } else if (REGEX.test(url)) {
    if (!options.reload) {
      var cache = cacheManager.cachedFiles.get(url);

      if (cache) {
        inCache = true;
        url = cache.url;
      } else {
        var tempUrl = cacheManager.tempFiles.get(url);

        if (tempUrl) {
          inLocal = true;
          url = tempUrl;
        }
      }
    }
  } else {
    inLocal = true;
  }

  return {
    url: url,
    inLocal: inLocal,
    inCache: inCache
  };
}

cc.assetManager.transformPipeline.append(function (task) {
  var input = task.output = task.input;

  for (var i = 0, l = input.length; i < l; i++) {
    var item = input[i];
    var options = item.options;

    if (!item.config) {
      if (item.ext === 'bundle') continue;
      options.cacheEnabled = options.cacheEnabled !== undefined ? options.cacheEnabled : false;
    } else {
      options.__cacheBundleRoot__ = item.config.name;
    }

    if (item.ext === '.cconb') {
      item.url = item.url.replace(item.ext, '.bin');
    } else if (item.ext === '.ccon') {
      item.url = item.url.replace(item.ext, '.json');
    }
  }
});
var originInit = cc.assetManager.init;

cc.assetManager.init = function (options) {
  originInit.call(cc.assetManager, options);
  options.subpackages && options.subpackages.forEach(function (x) {
    return subpackages[x] = 'subpackages/' + x;
  });
  cacheManager.init();
};