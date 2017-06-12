import R from 'ramda';
import { getInitialField, nearPositions, openPosition, positionIsValid } from './Field';
const startBattle = (fieldConfig) => {
    const field = getInitialField(fieldConfig);
    return { field, isOver: false };
};
const openNearPositions = (battle, pos) => R.last(nearPositions(pos).map(p => clickPosition(battle, p)));
const openAllField = (field) => field.map(col => col.map(pos => openPosition(pos)));
function endBattle(battle) {
    battle.isOver = true;
    battle.field = openAllField(battle.field);
    return battle;
}
const clickPosition = (battle, position) => {
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
};
export { startBattle, clickPosition };
//# sourceMappingURL=Battle.js.map