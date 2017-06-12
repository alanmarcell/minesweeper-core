'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickPosition = exports.startBattle = undefined;

var _Field = require('./Field');

function startBattle(fieldConfig) {
    var field = (0, _Field.getInitialField)(fieldConfig);
    return { field: field, isOver: false };
}
function openNearPositions(battle, pos) {
    // TODO impure
    (0, _Field.nearPositions)(pos).map(function (p) {
        return clickPosition(battle, p);
    });
    return battle;
}
function openAllField(field) {
    return field.map(function (col) {
        return col.map(function (pos) {
            return (0, _Field.openPosition)(pos);
        });
    });
}
function endBattle(battle) {
    var finalBattle = battle;
    finalBattle.isOver = true;
    finalBattle.field = openAllField(finalBattle.field);
    return finalBattle;
}
function clickPosition(battle, position) {
    if (!(0, _Field.positionIsValid)(battle.field, position)) return battle;
    var pos = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) return endBattle(battle);
    var openedPos = (0, _Field.openPosition)(pos);
    if (openedPos.nearBombs === 0) return openNearPositions(battle, openedPos);
    return battle;
}
exports.startBattle = startBattle;
exports.clickPosition = clickPosition;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map