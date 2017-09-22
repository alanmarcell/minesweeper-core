import R from 'ramda';
import { getInitialField, markPosition, nearPositions, openPosition, positionIsValid } from './Field';
const startBattle = (fieldConfig) => {
    const field = getInitialField(fieldConfig);
    return { field, isOver: false };
};
const openNearPositions = (battle, pos) => R.last(nearPositions(pos).map(p => clickPosition(battle, p, true)));
const openAllField = (field) => field.map(col => col.map(pos => openPosition(pos)));
function endBattle(battle) {
    battle.isOver = true;
    battle.field = openAllField(battle.field);
    return battle;
}
const clickPosition = (battle, position, autoOpen) => {
    if (!positionIsValid(battle.field, position))
        return battle;
    const pos = battle.field[position.x][position.y];
    if (pos.opened) {
        if (!autoOpen)
            console.log('Position Already open, try again');
        return battle;
    }
    if (pos.isBomb)
        return endBattle(battle);
    const openedPos = openPosition(pos);
    if (openedPos.nearBombs === 0)
        return openNearPositions(battle, openedPos);
    return battle;
};
const battleMarkPosition = (battle, position) => {
    console.log('MARKPOS BATTLE');
    if (!positionIsValid(battle.field, position))
        return battle;
    let pos = battle.field[position.x][position.y];
    if (pos.opened)
        return battle;
    if (pos.isBomb)
        return endBattle(battle);
    // pos.marked++;
    console.log('BEFORE POS', pos);
    pos = markPosition(pos);
    console.log('AFTER POS', pos);
    return battle;
};
export { startBattle, clickPosition, battleMarkPosition };
//# sourceMappingURL=Battle.js.map