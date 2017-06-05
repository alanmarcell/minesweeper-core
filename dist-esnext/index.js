import { openPosition, startBattle } from './Battle';
var play = startBattle();
do {
    const x = Math.floor((play.field.length - 1) * Math.random() + 1);
    const y = Math.floor((play.field[0].length - 1) * Math.random() + 1);
    play = openPosition(play, { x, y });
} while (!play.isOver);
//# sourceMappingURL=index.js.map