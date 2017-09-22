import R from 'ramda';
import { getInitialField, markPosition, nearPositions, openPosition, positionIsValid } from './Field';
import { IBattle } from './IBattle';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';

const startBattle = (fieldConfig: IFieldConfig): IBattle => {
    const field: IField = getInitialField(fieldConfig);
    return { field, isOver: false };
};

const openNearPositions = (battle: IBattle, pos: IPositionArgs) =>
    R.last(nearPositions(pos).map(p => clickPosition(battle, p, true)));

const openAllField = (field: IField) =>
    field.map(col => col.map(pos => openPosition(pos)));

function endBattle(battle: IBattle): IBattle {
    battle.isOver = true;
    battle.field = openAllField(battle.field);
    return battle;
}

const clickPosition = (battle: IBattle, position: IPositionArgs, autoOpen?: boolean): IBattle => {
    if (!positionIsValid(battle.field, position)) return battle;

    const pos: IPosition = battle.field[position.x][position.y];
    if (pos.opened) {
        if (!autoOpen) console.log('Position Already open, try again');
        return battle;
    }
    if (pos.isBomb) return endBattle(battle);

    const openedPos = openPosition(pos);
    if (openedPos.nearBombs === 0) return openNearPositions(battle, openedPos);
    return battle;
};

const battleMarkPosition = (battle: IBattle, position: IPositionArgs): IBattle => {
    console.log('MARKPOS BATTLE');
    if (!positionIsValid(battle.field, position)) return battle;

    let pos: IPosition = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) return endBattle(battle);

    // pos.marked++;
    console.log('BEFORE POS', pos);
    pos = markPosition(pos);

    console.log('AFTER POS', pos);
    return battle;
};

export {
    startBattle,
    clickPosition,
    battleMarkPosition
};
