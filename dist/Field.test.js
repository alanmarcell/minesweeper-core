'use strict';

var _chai = require('chai');

var a = _interopRequireWildcard(_chai);

var _Field = require('./Field');

var field = _interopRequireWildcard(_Field);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var should = a.should();
// import { LogFile } from 'ptz-log-file';

a.default.should();
// import { IPosition } from './IPosition';
// const log = LogFile({});
describe('Field', function () {
    describe('getInitialField', function () {
        var fieldConfig;
        var initialField;
        beforeEach(function () {
            fieldConfig = {
                bombs: 9, width: 9, heigth: 9
            };
            initialField = field.getInitialField(fieldConfig);
            initialField.should.be.an('array');
        });
        it('bombs in the field should match fieldConfig bombs', function () {
            var bombs = 0;
            initialField.map(function (col) {
                return col.map(function (pos) {
                    return pos.isBomb ? bombs++ : bombs;
                });
            });
            bombs.should.be.equal(fieldConfig.bombs);
        });
        it('should field size match fieldConfig size', function () {
            initialField.length.should.be.equal(fieldConfig.width);
            initialField[0].length.should.be.equal(fieldConfig.heigth);
        });
        it('should throw an error if bombs number is bigger than fild size', function () {
            try {
                var invalidFieldConfig = {
                    bombs: 27, width: 5, heigth: 5
                };
                should.not.exist(initialField = field.getInitialField(invalidFieldConfig));
            } catch (e) {
                e.should.be.an('error');
            }
        });
        it('count near bombs', function () {
            initialField = field.getInitialField(fieldConfig);
            var countedField = field.countNearBombs(initialField);
            countedField.should.be.an('array');
        });
    });
});
//# sourceMappingURL=Field.test.js.map
//# sourceMappingURL=Field.test.js.map