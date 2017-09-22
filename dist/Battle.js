'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.battleMarkPosition = exports.clickPosition = exports.startBattle = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Field = require('./Field');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startBattle = function startBattle(fieldConfig) {
    var field = (0, _Field.getInitialField)(fieldConfig);
    return { field: field, isOver: false, marks: 0, bombsMarked: 0, winner: null };
};
var openNearPositions = function openNearPositions(battle, pos) {
    return _ramda2.default.last((0, _Field.nearPositions)(pos).map(function (p) {
        return clickPosition(battle, p, true);
    }));
};
var openAllField = function openAllField(field) {
    return field.map(function (col) {
        return col.map(function (pos) {
            return (0, _Field.openPosition)(pos);
        });
    });
};
var winBattle = function winBattle(battle) {
    return endBattle(battle, true);
};
var loseBattle = function loseBattle(battle) {
    return endBattle(battle, false);
};
function endBattle(battle, win) {
    battle.isOver = true;
    battle.winner = win;
    battle.field = openAllField(battle.field);
    return battle;
}
var clickPosition = function clickPosition(battle, position, autoOpen) {
    battle.message = null;
    if (!(0, _Field.positionIsValid)(battle.field, position)) return battle;
    var pos = battle.field[position.x][position.y];
    if (pos.marked !== 0) return battle;
    if (pos.opened) {
        if (!autoOpen) battle.message = 'Position Already open, try again';
        return battle;
    }
    if (pos.isBomb) return loseBattle(battle);
    var openedPos = (0, _Field.openPosition)(pos);
    if (openedPos.nearBombs === 0) return openNearPositions(battle, openedPos);
    return checkOpenedPositions(battle);
};
var checkOpenedPositions = function checkOpenedPositions(battle) {
    var openedPos = 0;
    var numBombs = 0;
    var totalPos = battle.field.length * battle.field[0].length;
    battle.field.map(function (col) {
        return col.map(function (pos) {
            if (pos.opened) openedPos++;
            if (pos.isBomb) numBombs++;
        });
    });
    if (openedPos === totalPos - numBombs) {
        return winBattle(battle);
    }
    return battle;
};
var checkMarkedPositions = function checkMarkedPositions(battle) {
    var correctMarked = 0,
        incorrectMarked = 0,
        numBombs = 0;
    battle.field.map(function (col) {
        return col.map(function (pos) {
            if (pos.isBomb) numBombs++;
            if (pos.marked && pos.isBomb) correctMarked++;
            if (pos.marked && !pos.isBomb) incorrectMarked++;
        });
    });
    if (correctMarked === numBombs && incorrectMarked === 0) {
        return winBattle(battle);
    }
    return battle;
};
var battleMarkPosition = function battleMarkPosition(battle, position) {
    if (!(0, _Field.positionIsValid)(battle.field, position)) return battle;
    var pos = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    // if (pos.isBomb) {
    //     return endBattle(battle);
    // }
    battle.field[position.x][position.y] = (0, _Field.markPosition)(pos);
    return checkMarkedPositions(battle);
};
exports.startBattle = startBattle;
exports.clickPosition = clickPosition;
exports.battleMarkPosition = battleMarkPosition;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map