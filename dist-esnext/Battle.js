import { getInitialField, nearPositions } from './Field';
function startBattle() {
    const fieldConfig = {
        width: 9,
        height: 9,
        bombs: 9
    };
    const field = getInitialField(fieldConfig);
    const battle = {
        field,
        isOver: false
    };
    return battle;
}
function openPosition(pos) {
    pos.opened = true;
    return pos;
}
function openNearPositions(battle, pos) {
    nearPositions(pos).map(p => clickPosition(battle, p));
    return battle;
}
function openAllField(field) {
    return field.map(col => col.map(pos => openPosition(pos)));
}
function endBattle(battle) {
    const finalBattle = battle;
    finalBattle.isOver = true;
    finalBattle.field = openAllField(finalBattle.field);
    return finalBattle;
}
function positionIsInvalid(field, position) {
    console.log('Invalid position, try again');
    return position.x < 0 || position.x >= field.length || position.y < 0 || position.y >= field[0].length;
}
function clickPosition(battle, position) {
    if (positionIsInvalid(battle.field, position))
        return battle;
    let pos = battle.field[position.x][position.y];
    if (pos.opened)
        return battle;
    if (pos.isBomb) {
        console.log('GAME OVER!', position);
        return endBattle(battle);
    }
    pos = openPosition(pos);
    if (pos.nearBombs === 0)
        battle = openNearPositions(battle, pos);
    return battle;
}
export { startBattle, clickPosition };
//# sourceMappingURL=Battle.js.map