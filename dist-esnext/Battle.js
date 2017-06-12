import { getInitialField, nearPositions, openPosition, positionIsValid } from './Field';
function startBattle(fieldConfig) {
    const field = getInitialField(fieldConfig);
    return { field, isOver: false };
}
function openNearPositions(battle, pos) {
    // TODO impure
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
function clickPosition(battle, position) {
    if (!positionIsValid(battle.field, position))
        return battle;
    const pos = battle.field[position.x][position.y];
    if (pos.opened)
        return battle;
    if (pos.isBomb)
        return endBattle(battle);
    const openedPos = openPosition(pos);
    if (openedPos.nearBombs === 0)
        return openNearPositions(battle, openedPos);
    return battle;
}
export { startBattle, clickPosition };
//# sourceMappingURL=Battle.js.map