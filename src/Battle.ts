// import { IBattle, IBattleArgs } from './IBattle';
import { getInitialField, logField } from './Field';
import { IBattle } from './IBattle';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';
// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});

function startBattle() {
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
    logField(field);
    return battle;
}

function gameOver(field: IField): IField {
    const countedField: IField = field;
    field.map((col, colIndex) => col.map((pos, index) => {

        countedField[pos.x][pos.y].opened = true;

    }));
    return countedField;
}

function openPosition(battle: IBattle, position: IPositionArgs) {
    const pos: IPosition = battle.field[position.x][position.y];
    if (pos.isBomb) {
        battle.isOver = true;
        battle.field = gameOver(battle.field);
        console.log('GAME OVER!');
    }
    pos.opened = true;
    logField(battle.field);
    return battle;
}

export {
    startBattle,
    openPosition
};
