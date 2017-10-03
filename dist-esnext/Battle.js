import R from 'ramda';
import { getInitialField, markPosition, openPosition, positionIsValid, validNearPos } from './Field';
// import { log } from './index';
const startBattle = (fieldConfig) => {
    const field = getInitialField(fieldConfig);
    return { field, isOver: false, marks: 0, bombsMarked: 0, winner: null };
};
const openNearPositions = (battle, pos) => R.last(validNearPos(battle.field, pos).map(p => clickPosition(battle, p, true)));
const openAllField = (field) => field.map(col => col.map(pos => openPosition(pos)));
const winBattle = (battle) => endBattle(battle, true);
const loseBattle = (battle) => endBattle(battle, false);
function endBattle(oldBattle, win) {
    const battle = R.clone(oldBattle);
    battle.isOver = true;
    battle.winner = win;
    battle.field = openAllField(battle.field);
    return battle;
}
const battleMarkPosition = (oldBattle, position) => {
    const battle = R.clone(oldBattle);
    if (!positionIsValid(battle.field, position))
        return battle;
    const pos = battle.field[position.x][position.y];
    if (pos.opened)
        return battle;
    // if (pos.isBomb) {
    //     return endBattle(battle);
    // }
    battle.field[position.x][position.y] = markPosition(pos);
    return checkMarkedPositions(battle);
};
const clickPosition = (oldBattle, position, autoOpen) => {
    const battle = R.clone(oldBattle);
    battle.message = null;
    // log(!positionIsValid(battle.field, position));
    if (!positionIsValid(battle.field, position)) {
        console.log('POSITION IS INVALID');
        return battle;
    }
    const pos = battle.field[position.x][position.y];
    if (pos.marked !== 0)
        return battle;
    if (pos.opened) {
        if (!autoOpen)
            battle.message = 'Position Al ready open, try again';
        return battle;
    }
    if (pos.isBomb)
        return loseBattle(battle);
    const openedPos = openPosition(pos);
    battle.field[position.x][position.y] = openedPos;
    if (openedPos.nearBombs && openedPos.nearBombs === 0)
        return openNearPositions(battle, openedPos);
    return checkOpenedPositions(battle);
};
const checkOpenedPositions = (battle) => {
    let openedPos = 0;
    let numBombs = 0;
    const totalPos = battle.field.length * battle.field[0].length;
    battle.field.map(col => col.map(pos => {
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
    battle.field.map(col => col.map(pos => {
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
export { startBattle, clickPosition, battleMarkPosition, openNearPositions };
//# sourceMappingURL=Battle.js.map