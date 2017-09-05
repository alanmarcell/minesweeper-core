'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.markPosition = exports.clickPosition = exports.startBattle = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _Field = require('./Field');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startBattle = function startBattle(fieldConfig) {
    var field = (0, _Field.getInitialField)(fieldConfig);
    return { field: field, isOver: false };
};
var openNearPositions = function openNearPositions(battle, pos) {
    return _ramda2.default.last((0, _Field.nearPositions)(pos).map(function (p) {
        return clickPosition(battle, p);
    }));
};
var openAllField = function openAllField(field) {
    return field.map(function (col) {
        return col.map(function (pos) {
            return (0, _Field.openPosition)(pos);
        });
    });
};
function endBattle(battle) {
    battle.isOver = true;
    battle.field = openAllField(battle.field);
    return battle;
}
// TODO: rewrite
var clickPosition = function clickPosition(battle, position) {
    if (!(0, _Field.positionIsValid)(battle.field, position)) return battle;
    var pos = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) return endBattle(battle);
    var openedPos = (0, _Field.openPosition)(pos);
    if (openedPos.nearBombs === 0) return openNearPositions(battle, openedPos);
    return battle;
};
var markPosition = function markPosition(battle, position) {
    if (!(0, _Field.positionIsValid)(battle.field, position)) return battle;
    var pos = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) return endBattle(battle);
    pos.marked++;
    return battle;
};
exports.startBattle = startBattle;
exports.clickPosition = clickPosition;
exports.markPosition = markPosition;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map