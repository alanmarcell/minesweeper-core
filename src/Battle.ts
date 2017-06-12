import { getInitialField, nearPositions, openPosition, positionIsValid } from './Field';
import { IBattle } from './IBattle';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';

function startBattle(fieldConfig: IFieldConfig): IBattle {

    const field: IField = getInitialField(fieldConfig);

    // TODO delete variable
    const battle: IBattle = {
        field,
        isOver: false
    };
    return battle;
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
    if (!positionIsValid(battle.field, position))
        return battle;

    // TODO use const
    let pos: IPosition = battle.field[position.x][position.y];
    if (pos.opened)
        return battle;

    if (pos.isBomb) {
        console.log('GAME OVER!', position);
        return endBattle(battle);
    }

    pos = openPosition(pos);
    if (pos.nearBombs === 0)
        battle = openNearPositions(battle, pos); // TODO return directly with inline if
    return battle;
}

export {
    startBattle,
    clickPosition
};
