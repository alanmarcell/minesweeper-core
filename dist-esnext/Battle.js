// import { IBattle, IBattleArgs } from './IBattle';
import { getInitialField, logField } from './Field';
// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});
function startBattle() {
    const fieldConfig = {
        width: 9,
        heigth: 9,
        bombs: 9
    };
    const field = getInitialField(fieldConfig);
    const battle = {
        field,
        isOver: false
    };
    logField(field);
    return battle;
}
function gameOver(field) {
    const countedField = field;
    field.map((col, colIndex) => col.map((pos, index) => {
        countedField[pos.x][pos.y].opened = true;
    }));
    return countedField;
}
function openPosition(battle, position) {
    const pos = battle.field[position.x][position.y];
    if (pos.isBomb) {
        battle.isOver = true;
        battle.field = gameOver(battle.field);
        console.log('GAME OVER!');
    }
    pos.opened = true;
    logField(battle.field);
    return battle;
}
export { startBattle, openPosition };
//# sourceMappingURL=Battle.js.map