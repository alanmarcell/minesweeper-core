'use strict';

var _Battle = require('./Battle');

var _Field = require('./Field');

var battle = (0, _Battle.startBattle)();
do {
    var x = Math.floor((battle.field.length - 1) * Math.random() + 1);
    var y = Math.floor((battle.field[0].length - 1) * Math.random() + 1);
    battle = (0, _Battle.clickPosition)(battle, { x: x, y: y });
    (0, _Field.logField)(battle.field);
} while (!battle.isOver);
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map