'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openNearPositions = exports.battleMarkPosition = exports.clickPosition = exports.startBattle = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Field = require('./Field');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { log } from './index';
const startBattle = fieldConfig => {
    const field = (0, _Field.getInitialField)(fieldConfig);
    return { field, isOver: false, marks: 0, bombsMarked: 0, winner: null };
};
const openNearPositions = (battle, pos) => _ramda2.default.last((0, _Field.validNearPos)(battle.field, pos).map(p => clickPosition(battle, p, true)));
const openAllField = field => field.map(col => col.map(pos => (0, _Field.openPosition)(pos)));
const winBattle = battle => endBattle(battle, true);
const loseBattle = battle => endBattle(battle, false);
function endBattle(oldBattle, win) {
    const battle = _ramda2.default.clone(oldBattle);
    battle.isOver = true;
    battle.winner = win;
    battle.field = openAllField(battle.field);
    return battle;
}
const battleMarkPosition = (oldBattle, position) => {
    const battle = _ramda2.default.clone(oldBattle);
    if (!(0, _Field.positionIsValid)(battle.field, position)) return battle;
    const pos = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    // if (pos.isBomb) {
    //     return endBattle(battle);
    // }
    battle.field[position.x][position.y] = (0, _Field.markPosition)(pos);
    return checkMarkedPositions(battle);
};
const clickPosition = (oldBattle, position, autoOpen) => {
    const battle = _ramda2.default.clone(oldBattle);
    battle.message = null;
    // log(!positionIsValid(battle.field, position));
    if (!(0, _Field.positionIsValid)(battle.field, position)) {
        console.log('POSITION IS INVALID');
        return battle;
    }
    const pos = battle.field[position.x][position.y];
    if (pos.marked !== 0) return battle;
    if (pos.opened) {
        if (!autoOpen) battle.message = 'Position Al ready open, try again';
        return battle;
    }
    if (pos.isBomb) return loseBattle(battle);
    const openedPos = (0, _Field.openPosition)(pos);
    battle.field[position.x][position.y] = openedPos;
    if (openedPos.nearBombs && openedPos.nearBombs === 0) return openNearPositions(battle, openedPos);
    return checkOpenedPositions(battle);
};
const checkOpenedPositions = battle => {
    let openedPos = 0;
    let numBombs = 0;
    const totalPos = battle.field.length * battle.field[0].length;
    battle.field.map(col => col.map(pos => {
        if (pos.opened) openedPos++;
        if (pos.isBomb) numBombs++;
    }));
    if (openedPos === totalPos - numBombs) {
        return winBattle(battle);
    }
    return battle;
};
const checkMarkedPositions = battle => {
    let correctMarked = 0,
        incorrectMarked = 0,
        numBombs = 0;
    battle.field.map(col => col.map(pos => {
        if (pos.isBomb) numBombs++;
        if (pos.marked && pos.isBomb) correctMarked++;
        if (pos.marked && !pos.isBomb) incorrectMarked++;
    }));
    if (correctMarked === numBombs && incorrectMarked === 0) {
        return winBattle(battle);
    }
    return battle;
};
exports.startBattle = startBattle;
exports.clickPosition = clickPosition;
exports.battleMarkPosition = battleMarkPosition;
exports.openNearPositions = openNearPositions;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map