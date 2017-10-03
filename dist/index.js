'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;

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

var _ptzLogFile = require('ptz-log-file');

var _ptzLogFile2 = _interopRequireDefault(_ptzLogFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _ptzLogFile2.default)({ dir: './logs' });
exports.log = log;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map