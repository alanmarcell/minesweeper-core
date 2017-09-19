import R from 'ramda';
import { getInitialField, nearPositions, openPosition, positionIsValid } from './Field';
import { IBattle } from './IBattle';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';

const startBattle = (fieldConfig: IFieldConfig) => {
    const field: IField = getInitialField(fieldConfig);
    return { field, isOver: false };
};

const openNearPositions = (battle: IBattle, pos: IPositionArgs) =>
    R.last(nearPositions(pos).map(p => clickPosition(battle, p)));

const openAllField = (field: IField) =>
    field.map(col => col.map(pos => openPosition(pos)));

function endBattle(battle: IBattle): IBattle {
    battle.isOver = true;
    battle.field = openAllField(battle.field);
    return battle;
}

const clickPosition = (battle: IBattle, position: IPositionArgs) => {
    if (!positionIsValid(battle.field, position)) return battle;

    const pos: IPosition = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) return endBattle(battle);

    const openedPos = openPosition(pos);
    if (openedPos.nearBombs === 0) return openNearPositions(battle, openedPos);
    return battle;
};

const markPosition = (battle: IBattle, position: IPositionArgs) => {
    if (!positionIsValid(battle.field, position)) return battle;

    const pos: IPosition = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) return endBattle(battle);

    pos.marked++;
    return battle;
};

export {
    startBattle,
    clickPosition,
    markPosition
};
