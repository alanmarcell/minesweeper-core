import { getInitialField, nearPositions, openPosition, positionIsValid } from './Field';
import { IBattle } from './IBattle';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';

function startBattle(fieldConfig: IFieldConfig): IBattle {
    const field: IField = getInitialField(fieldConfig);
    return { field, isOver: false };
}
function openNearPositions(battle: IBattle, pos: IPositionArgs) {
    // TODO impure
    nearPositions(pos).map(p => clickPosition(battle, p));
    return battle;
}

function openAllField(field: IField): IField {
    return field.map(col => col.map(pos => openPosition(pos)));
}

function endBattle(battle: IBattle): IBattle {
    const finalBattle: IBattle = battle;
    finalBattle.isOver = true;
    finalBattle.field = openAllField(finalBattle.field);
    return finalBattle;
}

function clickPosition(battle: IBattle, position: IPositionArgs): IBattle {
    if (!positionIsValid(battle.field, position)) return battle;

    const pos: IPosition = battle.field[position.x][position.y];
    if (pos.opened) return battle;
    if (pos.isBomb) return endBattle(battle);

    const openedPos = openPosition(pos);
    if (openedPos.nearBombs === 0) return openNearPositions(battle, openedPos);
    return battle;
}

export {
    startBattle,
    clickPosition
};
