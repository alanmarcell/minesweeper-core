import { getInitialField } from './Field';
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
    return battle;
}
function gameOver(field) {
    const finalField = field;
    field.map(col => col.map(pos => finalField[pos.x][pos.y].opened = true));
    return finalField;
}
function positionIsInvalid(field, position) {
    return position.x < 0 || position.x >= field.length || position.y < 0 || position.y >= field[0].length;
}
function openPosition(battle, position) {
    if (positionIsInvalid(battle.field, position))
        return battle;
    const pos = battle.field[position.x][position.y];
    if (pos.opened)
        return battle;
    if (pos.isBomb) {
        battle.isOver = true;
        battle.field = gameOver(battle.field);
        console.log('GAME OVER!', position);
        return battle;
    }
    pos.opened = true;
    if (pos.nearBombs === 0)
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0)
                    continue;
                battle = openPosition(battle, { x: pos.x + i, y: pos.y + j });
            }
        }
    return battle;
}
export { startBattle, openPosition };
//# sourceMappingURL=Battle.js.map