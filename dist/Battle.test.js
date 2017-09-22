'use strict';

var _ptzAssert = require('ptz-assert');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Battle = require('./Battle');

var battle = _interopRequireWildcard(_Battle);

var _Field = require('./Field');

var Field = _interopRequireWildcard(_Field);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Battle', () => {
    describe('startBattle', () => {
        let fieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('returns new battle', () => {
            const result = battle.startBattle(fieldConfig);
            (0, _ptzAssert.ok)(result);
        });
    });
    describe('clickPosition', () => {
        let fieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('shold not open if position is invalid ', () => {
            const newBattle = battle.startBattle(fieldConfig);
            let opened = 0;
            const invalidPos = { x: -1, y: -1 };
            const result = battle.clickPosition(newBattle, invalidPos);
            Field.allPositions(result.field).map(p => p.opened ? opened++ : opened);
            opened.should.be.equal(0);
        });
        it('shold open if position is valid ', () => {
            const newBattle = battle.startBattle(fieldConfig);
            let opened = 0;
            const valid = { x: 1, y: 1 };
            const result = battle.clickPosition(newBattle, valid);
            Field.allPositions(result.field).map(p => p.opened ? opened++ : opened);
            opened.should.not.be.equal(0);
        });
        it('shold not open if position is open', () => {
            const newBattle = battle.startBattle(fieldConfig);
            let openedFirst = 0;
            let openedSecond = 0;
            const valid = { x: 1, y: 1 };
            const result = battle.clickPosition(newBattle, valid);
            const result2 = battle.clickPosition(result, valid);
            Field.allPositions(result.field).map(p => p.opened ? openedFirst++ : openedFirst);
            Field.allPositions(result2.field).map(p => p.opened ? openedSecond++ : openedSecond);
            openedFirst.should.be.equal(openedSecond);
        });
        it('shold open if position is not open', () => {
            const newBattle = battle.startBattle(fieldConfig);
            let openedFirst = 0;
            let openedSecond = 0;
            const valid = { x: 1, y: 1 };
            const result = battle.clickPosition(newBattle, valid);
            let valid2;
            valid2 = _ramda2.default.find(_ramda2.default.propEq('opened', false), Field.allPositions(result.field));
            Field.allPositions(result.field).map(p => p.opened ? openedFirst++ : openedFirst);
            const result2 = battle.clickPosition(result, valid2);
            Field.allPositions(result2.field).map(p => p.opened ? openedSecond++ : openedSecond);
            openedFirst.should.be.not.equal(openedSecond);
        });
        it('shold open if position is not marked', () => {
            const newBattle = battle.startBattle(fieldConfig);
            const valid = { x: 1, y: 1 };
            const clicked = battle.clickPosition(newBattle, valid);
            clicked.field[valid.x][valid.y].opened.should.be.equal(true);
            clicked.field[valid.x][valid.y].marked.should.be.equal(0);
            (0, _ptzAssert.ok)(clicked);
        });
        it('shold not open if position is marked', () => {
            const newBattle = battle.startBattle(fieldConfig);
            const valid = { x: 1, y: 1 };
            const marked = battle.battleMarkPosition(newBattle, valid);
            const clicked = battle.clickPosition(marked, valid);
            clicked.field[valid.x][valid.y].opened.should.be.equal(false);
            clicked.field[valid.x][valid.y].marked.should.be.equal(1);
            (0, _ptzAssert.ok)(clicked);
        });
    });
    describe('markPosition', () => {
        let fieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('should mark pos if not open', () => {
            const newBattle = battle.startBattle(fieldConfig);
            const valid = { x: 1, y: 1 };
            const result = battle.battleMarkPosition(newBattle, valid);
            result.field[valid.x][valid.y].marked.should.be.equal(1);
            (0, _ptzAssert.ok)(result);
        });
        it('should not mark pos if open', () => {
            const newBattle = battle.startBattle(fieldConfig);
            const valid = { x: 1, y: 1 };
            const clicked = battle.clickPosition(newBattle, valid);
            const marked = battle.battleMarkPosition(clicked, valid);
            marked.field[valid.x][valid.y].opened.should.be.equal(true);
            marked.field[valid.x][valid.y].marked.should.be.equal(0);
            (0, _ptzAssert.ok)(marked);
        });
    });
});
//# sourceMappingURL=Battle.test.js.map
//# sourceMappingURL=Battle.test.js.map