'use strict';

var _Battle = require('./Battle');

var play = (0, _Battle.startBattle)();
do {
    var x = Math.floor((play.field.length - 1) * Math.random() + 1);
    var y = Math.floor((play.field[0].length - 1) * Math.random() + 1);
    play = (0, _Battle.openPosition)(play, { x: x, y: y });
} while (!play.isOver);
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map