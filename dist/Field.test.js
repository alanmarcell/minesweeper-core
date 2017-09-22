'use strict';

var _chai = require('chai');

var a = _interopRequireWildcard(_chai);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Field = require('./Field');

var Field = _interopRequireWildcard(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var should = a.should();
a.default.should();
before('set test args', function () {
    var validFieldConfig = { bombs: 9, width: 9, height: 9 };
    var invalidFieldConfig = { bombs: 27, width: 5, height: 5 };
    var validPos = { x: 0, y: 0 };
    var invalidPos = { x: -1, y: -1 };
    var initialField = Field.getInitialField(validFieldConfig);
    var emptyField = Field.getEmptyField(validFieldConfig);
    describe('Field', function () {
        describe('getEmptyField', function () {
            emptyField.should.be.an('array');
            it('should have no bombs', function () {
                var bombs = 0;
                Field.allPositions(emptyField).map(function (p) {
                    return p.isBomb ? bombs++ : bombs;
                });
                bombs.should.be.equal(0);
            });
            it('should field size match fieldConfig size', function () {
                emptyField.length.should.be.equal(validFieldConfig.width);
                emptyField[0].length.should.be.equal(validFieldConfig.height);
            });
        });
        describe('getBombedField', function () {
            var bombedField = Field.getBombedField(emptyField, validFieldConfig);
            bombedField.should.be.an('array');
            it('should match bombs in the field with fieldConfig bombs', function () {
                var bombs = 0;
                Field.allPositions(bombedField).map(function (p) {
                    return p.isBomb ? bombs++ : bombs;
                });
                bombs.should.be.equal(validFieldConfig.bombs);
            });
            it('should throw an error if bombs number is bigger than fild size', function () {
                try {
                    var invalidField = Field.getInitialField(invalidFieldConfig);
                    should.not.exist(invalidField);
                } catch (e) {
                    e.should.be.an('error');
                }
            });
        });
        describe('countNearBombs', function () {
            it('should increase near bombs', function () {
                var countedField = Field.countNearBombs(initialField);
                var flattenField = _ramda2.default.flatten(countedField);
                var isBombeb = function isBombeb(pos) {
                    return pos.isBomb;
                };
                var bombedPos = _ramda2.default.find(isBombeb, flattenField);
                var nearBombebPos = function nearBombebPos(pos) {
                    return Field.validNearPos(initialField, pos);
                };
                nearBombebPos(bombedPos).map(function (p) {
                    return countedField[p.x][p.y].nearBombs.should.be.above(0);
                });
                countedField.should.be.an('array');
            });
        });
        describe('openPosition', function () {
            it('should return a opened position if not marked', function () {
                var closedPosition = Field.newPos(1, 1);
                var clickedPosition = Field.openPosition(closedPosition);
                // tslint:disable-next-line:no-unused-expression
                clickedPosition.opened.should.be.true;
            });
            it('should return a not opened position if marked', function () {
                var closedPosition = Field.newPos(1, 1);
                var marked1Position = Field.markPosition(closedPosition);
                var clickedPosition = Field.markPosition(marked1Position);
                // tslint:disable-next-line:no-unused-expression
                clickedPosition.opened.should.be.not.true;
            });
        });
        describe('nearPositions', function () {
            it('should return near positions', function () {
                var nearPos = Field.nearPositions(validPos);
                nearPos.should.be.an('array');
            });
        });
        describe('positionIsValid', function () {
            it('should return true if position is valid', function () {
                var isValid = Field.positionIsValid(initialField, validPos);
                // tslint:disable-next-line:no-unused-expression
                isValid.should.be.true;
            });
            it('should return false if position is invalid', function () {
                var isValid = Field.positionIsValid(initialField, invalidPos);
                // tslint:disable-next-line:no-unused-expression
                isValid.should.be.false;
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
        describe('markPosition', function () {
            var closedPosition = Field.newPos(-1, 1);
            var marked1Position = Field.markPosition(closedPosition);
            it('should return a marked as 1 position', function () {
                marked1Position.marked.should.be.equal(1);
            });
            var marked2Position = Field.markPosition(marked1Position);
            it('should return a marked as 2 position', function () {
                marked2Position.marked.should.be.equal(2);
            });
            var marked3Position = Field.markPosition(marked2Position);
            it('should return a unmarked position', function () {
                marked3Position.marked.should.be.equal(0);
            });
        });
    });
});
//# sourceMappingURL=Field.test.js.map
//# sourceMappingURL=Field.test.js.map