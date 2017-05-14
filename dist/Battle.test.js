'use strict';

var _ptzAssert = require('ptz-assert');

var _Battle = require('./Battle');

var battle = _interopRequireWildcard(_Battle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});
// This are some tests examples
describe('Battle', function () {
    describe('funcTest', function () {
        it('returns true', function () {
            var result = battle.startBattle();
            (0, _ptzAssert.ok)(result);
        });
    });
});
//# sourceMappingURL=Battle.test.js.map
//# sourceMappingURL=Battle.test.js.map