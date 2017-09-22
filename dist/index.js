'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Battle = require('./Battle');

Object.keys(_Battle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Battle[key];
    }
  });
});

var _Field = require('./Field');

Object.keys(_Field).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Field[key];
    }
  });
});
//# sourceMappingURL=index.js.map