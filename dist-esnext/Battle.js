import R from 'ramda';
import { getInitialField, markPosition, nearPositions, openPosition, positionIsValid } from './Field';
const startBattle = (fieldConfig) => {
    const field = getInitialField(fieldConfig);
    return { field, isOver: false, marks: 0, bombsMarked: 0, winner: null };
};
const openNearPositions = (battle, pos) => R.last(nearPositions(pos).map(p => clickPosition(battle, p, true)));
const openAllField = (field) => field.positions.map(col => col.map(pos => openPosition(pos)));
const winBattle = (battle) => endBattle(battle, true);
const loseBattle = (battle) => endBattle(battle, false);
function endBattle(oldBattle, win) {
    const battle = R.clone(oldBattle);
    battle.isOver = true;
    battle.winner = win;
    battle.field.positions = openAllField(battle.field);
    return battle;
}
const clickPosition = (oldBattle, position, autoOpen) => {
    const battle = R.clone(oldBattle);
    battle.message = null;
    if (!positionIsValid(battle.field.positions, position))
        return battle;
    const pos = battle.field.positions[position.x][position.y];
    if (pos.marked !== 0)
        return battle;
    if (pos.opened) {
        if (!autoOpen)
            battle.message = 'Position Already open, try again';
        return battle;
    }
    if (pos.isBomb)
        return loseBattle(battle);
    const openedPos = openPosition(pos);
    if (openedPos.nearBombs === 0)
        return openNearPositions(battle, openedPos);
    return checkOpenedPositions(battle);
};
const checkOpenedPositions = (battle) => {
    let openedPos = 0;
    let numBombs = 0;
    const totalPos = battle.field.positions.length * battle.field.positions[0].length;
    battle.field.positions.map(col => col.map(pos => {
        if (pos.opened)
            openedPos++;
        if (pos.isBomb)
            numBombs++;
    }));
    if (openedPos === totalPos - numBombs) {
        return winBattle(battle);
    }
    return battle;
};
const checkMarkedPositions = (battle) => {
    let correctMarked = 0, incorrectMarked = 0, numBombs = 0;
    battle.field.positions.map(col => col.map(pos => {
        if (pos.isBomb)
            numBombs++;
        if (pos.marked && pos.isBomb)
            correctMarked++;
        if (pos.marked && !pos.isBomb)
            incorrectMarked++;
    }));
    if (correctMarked === numBombs && incorrectMarked === 0) {
        return winBattle(battle);
    }
    return battle;
};
const battleMarkPosition = (battle, position) => {
    if (!positionIsValid(battle.field.positions, position))
        return battle;
    const pos = battle.field.positions[position.x][position.y];
    if (pos.opened)
        return battle;
    // if (pos.isBomb) {
    //     return endBattle(battle);
    // }
    battle.field.positions[position.x][position.y] = markPosition(pos);
    return checkMarkedPositions(battle);
};
export { startBattle, clickPosition, battleMarkPosition, endBattle, openNearPositions };
//# sourceMappingURL=Battle.js.map