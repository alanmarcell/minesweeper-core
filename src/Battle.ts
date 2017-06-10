import { getInitialField, nearPositions } from './Field';
import { IBattle } from './IBattle';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';

function startBattle(): IBattle {
    const fieldConfig: IFieldConfig = {
        width: 9,
        heigth: 9,
        bombs: 9
    };
    const field: IField = getInitialField(fieldConfig);

    const battle: IBattle = {
        field,
        isOver: false
    };
    return battle;
}

function openPosition(pos: IPosition): IPosition {
    pos.opened = true;
    return pos;
}

function openNearPositions(battle: IBattle, pos: IPositionArgs) {
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

function positionIsInvalid(field: IField, position: IPositionArgs): boolean {
    console.log('Invalid position, try again');
    return position.x < 0 || position.x >= field.length || position.y < 0 || position.y >= field[0].length;
}

function clickPosition(battle: IBattle, position: IPositionArgs): IBattle {
    if (positionIsInvalid(battle.field, position))
        return battle;

    let pos: IPosition = battle.field[position.x][position.y];
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

export {
    startBattle,
    clickPosition
};
