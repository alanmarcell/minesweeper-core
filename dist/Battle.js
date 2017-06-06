'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openPosition = exports.startBattle = undefined;

var _Field = require('./Field');

function startBattle() {
    var fieldConfig = {
        width: 9,
        heigth: 9,
        bombs: 9
    };
    var field = (0, _Field.getInitialField)(fieldConfig);
    var battle = {
        field: field,
        isOver: false
    };
    return battle;
}
function gameOver(field) {
    var finalField = field;
    field.map(function (col) {
        return col.map(function (pos) {
            return finalField[pos.x][pos.y].opened = true;
        });
    });
    return finalField;
}
function positionIsInvalid(field, position) {
    return position.x < 0 || position.x >= field.length || position.y < 0 || position.y >= field[0].length;
}
function openPosition(battle, position) {
    if (positionIsInvalid(battle.field, position)) return battle;
    var pos = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) {
        battle.isOver = true;
        battle.field = gameOver(battle.field);
        console.log('GAME OVER!', position);
        return battle;
    }
    pos.opened = true;
    if (pos.nearBombs === 0) for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            battle = openPosition(battle, { x: pos.x + i, y: pos.y + j });
        }
    }
    return battle;
}
exports.startBattle = startBattle;
exports.openPosition = openPosition;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map