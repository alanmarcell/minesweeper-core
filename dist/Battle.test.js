'use strict';

var _ptzAssert = require('ptz-assert');

var _Battle = require('./Battle');

var battle = _interopRequireWildcard(_Battle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Battle', function () {
    describe('startBattle', function () {
        var fieldConfig = void 0;
        before('Set field config', function () {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('returns new battle', function () {
            var result = battle.startBattle(fieldConfig);
            (0, _ptzAssert.ok)(result);
        });
    });
});
//# sourceMappingURL=Battle.test.js.map
//# sourceMappingURL=Battle.test.js.map