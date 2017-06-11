'use strict';

var _chai = require('chai');

var a = _interopRequireWildcard(_chai);

var _Field = require('./Field');

var Field = _interopRequireWildcard(_Field);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var should = a.should();
// import R from 'ramda';
// import { LogFile } from 'ptz-log-file';

a.default.should();
// import { IPosition } from './IPosition';
// const log = LogFile({});
describe('getInitialField', function () {
    var fieldConfig = void 0;
    var initialField = void 0;
    var validPos = {
        x: 0,
        y: 0
    };
    beforeEach(function () {
        fieldConfig = {
            bombs: 9, width: 9, height: 9
        };
        initialField = Field.getInitialField(fieldConfig);
        initialField.should.be.an('array');
    });
    describe('Field', function () {
        it('bombs in the field should match fieldConfig bombs', function () {
            var bombs = 0;
            Field.allPositions(initialField).map(function (p) {
                return p.isBomb ? bombs++ : bombs;
            });
            bombs.should.be.equal(fieldConfig.bombs);
        });
        it('should field size match fieldConfig size', function () {
            initialField.length.should.be.equal(fieldConfig.width);
            initialField[0].length.should.be.equal(fieldConfig.height);
        });
        it('should throw an error if bombs number is bigger than fild size', function () {
            try {
                var invalidFieldConfig = {
                    bombs: 27, width: 5, height: 5
                };
                should.not.exist(initialField = Field.getInitialField(invalidFieldConfig));
            } catch (e) {
                e.should.be.an('error');
            }
        });
        it('count near bombs', function () {
            initialField = Field.getInitialField(fieldConfig);
            var countedField = Field.countNearBombs(initialField);
            countedField.should.be.an('array');
        });
    });
    describe('openPosition', function () {
        it('should return a opened position', function () {
            var closedPosition = Field.newPos(1, 1);
            var openedPosition = Field.openPosition(closedPosition);
            // tslint:disable-next-line:no-unused-expression
            openedPosition.opened.should.be.true;
        });
        it('should return a opened position', function () {
            var invalidPosition = Field.newPos(-1, 1);
            var openedPosition = Field.openPosition(invalidPosition);
            // tslint:disable-next-line:no-unused-expression
            openedPosition.opened.should.be.true;
        });
    });
    describe('nearPositions', function () {
        it('should return near positions', function () {
            var nearPos = Field.nearPositions(validPos);
            nearPos.should.be.an('array');
        });
    });
    describe.skip('positionIsValid', function () {
        it('should return true if position is valid', function () {
            Field.positionIsValid(initialField, validPos);
        });
        it('should return false if position is valid', function () {
            //
        });
    });
    describe('validNearPositions', function () {
        it('should return only valid near positions', function () {
            var nearPos = Field.validNearPos(initialField, validPos);
            var validateFn = function validateFn(np) {
                return np.map(Field.positionIsValid(initialField));
            };
            var validatedpos = validateFn(nearPos);
            validatedpos.map(function (p) {
                return p.should.be.true;
            });
            nearPos.should.be.an('array');
        });
    });
});
//# sourceMappingURL=Field.test.js.map
//# sourceMappingURL=Field.test.js.map