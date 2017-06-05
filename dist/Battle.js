'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openPosition = exports.startBattle = undefined;

var _Field = require('./Field');

// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});
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
    (0, _Field.logField)(field);
    return battle;
} // import { IBattle, IBattleArgs } from './IBattle';

function gameOver(field) {
    var countedField = field;
    field.map(function (col, colIndex) {
        return col.map(function (pos, index) {
            countedField[pos.x][pos.y].opened = true;
        });
    });
    return countedField;
}
function openPosition(battle, position) {
    var pos = battle.field[position.x][position.y];
    if (pos.isBomb) {
        battle.isOver = true;
        battle.field = gameOver(battle.field);
        console.log('GAME OVER!');
    }
    pos.opened = true;
    (0, _Field.logField)(battle.field);
    return battle;
}
exports.startBattle = startBattle;
exports.openPosition = openPosition;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map