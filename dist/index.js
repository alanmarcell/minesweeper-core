'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startBattle = exports.clickPosition = undefined;

var _Battle = require('./Battle');

var _Field = require('./Field');

var fieldConfig = {
    width: 9,
    height: 9,
    bombs: 9
};
var battle = (0, _Battle.startBattle)(fieldConfig);
do {
    var x = Math.floor((battle.field.length - 1) * Math.random() + 1);
    var y = Math.floor((battle.field[0].length - 1) * Math.random() + 1);
    battle = (0, _Battle.clickPosition)(battle, { x: x, y: y });
    (0, _Field.logField)(battle.field);
} while (!battle.isOver);
exports.clickPosition = _Battle.clickPosition;
exports.startBattle = _Battle.startBattle;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map