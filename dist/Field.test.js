'use strict';

var _ptzAssert = require('ptz-assert');

var _Field = require('./Field');

var field = _interopRequireWildcard(_Field);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import { IPosition } from './IPosition';
// const log = LogFile({});
describe('Field', function () {
    describe('getInitialField', function () {
        var fieldConfig;
        var initialField;
        beforeEach(function () {
            fieldConfig = {
                bombs: 5,
                size: { x: 5, y: 5 }
            };
            initialField = field.getInitialField(fieldConfig);
        });
        it('bombs in the field should match fieldConfig bombs', function () {
            var bombs = 0;
            initialField.map(function (col) {
                return col.map(function (pos) {
                    return pos.isBomb ? bombs++ : bombs;
                });
            });
            (0, _ptzAssert.equal)(bombs, fieldConfig.bombs);
        });
        it('field size should match fieldConfig size', function () {
            (0, _ptzAssert.equal)(initialField.length, fieldConfig.size.x);
            (0, _ptzAssert.equal)(initialField[0].length, fieldConfig.size.y);
        });
        it('should throw an error if bombs number is bigger than fild size', function () {
            fieldConfig = {
                bombs: 27,
                size: { x: 5, y: 5 }
            };
            initialField = field.getInitialField(fieldConfig);
            (0, _ptzAssert.ok)(initialField);
        });
    });
});
//# sourceMappingURL=Field.test.js.map

// import { LogFile } from 'ptz-log-file';
//# sourceMappingURL=Field.test.js.map