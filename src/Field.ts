import R from 'ramda';
import { IField, IFieldConfig } from './IField';
import { IPositionArgs } from './IPosition';

/**
 * Populate new field with bombs
 */
const getBombs = (field: IField, fieldConfig: IFieldConfig) => {
    for (let i = 0; i < fieldConfig.bombs; i++) {
        const width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
        const height = Math.floor((fieldConfig.height - 1) * Math.random() + 1);
        if (field[width][height] && field[width][height].isBomb)
            i--;
        field[width][height].isBomb = true;
    }
    return field;
};

/**
 * Receives a pos and return his near positions
 * args {IPositionArgs}
 * returns {IPositionArgs[]}
 */
const nearPositions = (pos: IPositionArgs) => {
    const range = R.range(-1, 2);
    /**
     * Get a 3x3 position array with the position and all the near positions then remove the position itseft
     */
    const arrayPos = R.remove(4, 1, range.map(i => range.map(j => {
        return { x: pos.x + i, y: pos.y + j };
    })));

    return arrayPos.reduce((a, b) => a.concat(b));
};

function isValidConfig(fieldConfig: IFieldConfig): boolean {
    const totalPositions = fieldConfig.width * fieldConfig.height;
    return totalPositions > fieldConfig.bombs ? true : false;
}

const allPositions = (field: IField) => field.reduce((a, b) => a.concat(b));

function countNearBombs(field: IField): IField {
    const countedField: IField = field;
    allPositions(field).map(pos => {
        if (pos.isBomb)
            nearPositions(pos).map(p => {
                if (countedField[p.x] && countedField[p.x][p.y])
                    countedField[p.x][p.y].nearBombs++;
            });
    });
    return countedField;
}

const getEmptyField = (fieldConfig: IFieldConfig) => {
    const widthRange = R.range(0, fieldConfig.width);
    const heightRange = R.range(0, fieldConfig.height);

    return widthRange.map(i => heightRange.map(j => newPos(i, j)));
};

/**
 * Get a new position
 */
const newPos = (i: number, j: number) => {
    return {
        x: i, y: j, isBomb: false, nearBombs: 0,
        opened: false, marked: 0, isValid: true
    };
};

function logField(field): void {
    const countedField: IField = field;
    let firstLine = '   |';
    field.map((f, index) => firstLine += ' ' + (index + 1) + ' |');
    console.log(firstLine);
    let row: string;
    field.map((col, colIndex) => {
        var line = '|';
        row = '   ';
        col.map((pos, index) => {
            if (index === 0 && colIndex === 0)
                line = line;
            if (index === 0)
                line = ' ' + (colIndex + 1) + ' |';
            if (countedField[pos.x][pos.y].opened) {
                if (countedField[pos.x][pos.y].isBomb) {
                    line += ' * ';
                    row += '---';
                } else {
                    line += ' ' + countedField[pos.x][pos.y].nearBombs + ' ';
                    row += '---';
                }
            } else {
                line += '   ';
                row += '---';
            }
            line += '|';
            row += '-';
        });
        console.log(row);
        console.log(line);
    });
    console.log(row + '\n');
}

function getInitialField(fieldConfig: IFieldConfig): IField {

    if (!isValidConfig(fieldConfig))
        throw new Error('Invalid field configuration');

    const emptyField = getEmptyField(fieldConfig);
    const bombedField: IField = getBombs(emptyField, fieldConfig);
    return countNearBombs(bombedField);
}

export {
    getInitialField, countNearBombs, logField, nearPositions
};
