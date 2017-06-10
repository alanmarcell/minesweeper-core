'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickPosition = exports.startBattle = undefined;

var _Field = require('./Field');

function startBattle() {
    var fieldConfig = {
        width: 9,
        height: 9,
        bombs: 9
    };
    var field = (0, _Field.getInitialField)(fieldConfig);
    var battle = {
        field: field,
        isOver: false
    };
    return battle;
}
function openPosition(pos) {
    pos.opened = true;
    return pos;
}
function openNearPositions(battle, pos) {
    (0, _Field.nearPositions)(pos).map(function (p) {
        return clickPosition(battle, p);
    });
    return battle;
}
function openAllField(field) {
    return field.map(function (col) {
        return col.map(function (pos) {
            return openPosition(pos);
        });
    });
}
function endBattle(battle) {
    var finalBattle = battle;
    finalBattle.isOver = true;
    finalBattle.field = openAllField(finalBattle.field);
    return finalBattle;
}
function positionIsInvalid(field, position) {
    console.log('Invalid position, try again');
    return position.x < 0 || position.x >= field.length || position.y < 0 || position.y >= field[0].length;
}
function clickPosition(battle, position) {
    if (positionIsInvalid(battle.field, position)) return battle;
    var pos = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) {
        console.log('GAME OVER!', position);
        return endBattle(battle);
    }
    pos = openPosition(pos);
    if (pos.nearBombs === 0) battle = openNearPositions(battle, pos);
    return battle;
}
exports.startBattle = startBattle;
exports.clickPosition = clickPosition;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map