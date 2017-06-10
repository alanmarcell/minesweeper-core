import { clickPosition, startBattle } from './Battle';
import { logField } from './Field';

var battle = startBattle();
do {
    const x = Math.floor((battle.field.length - 1) * Math.random() + 1);
    const y = Math.floor((battle.field[0].length - 1) * Math.random() + 1);

    battle = clickPosition(battle, { x, y });
    logField(battle.field);
}
while (!battle.isOver);
