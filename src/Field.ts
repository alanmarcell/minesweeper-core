import R from 'ramda';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';

/**
 * Checks if field has position.
 */
const positionIsValid = R.curry((field: IField, p: IPositionArgs) => {
    return p.x >= 0 && p.x < field.length && p.y >= 0 && p.y < field[0].length;
});

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
    return R.flatten(R.remove(4, 1, range.map(i => range.map(j => {
        return { x: pos.x + i, y: pos.y + j };
    }))));
};

const validNearPos = R.curry((field: IField, pos: IPositionArgs) =>
    R.filter(positionIsValid(field), nearPositions(pos)));

const openPosition = (pos: IPosition) => {
    const openedPos = pos;
    openedPos.opened = true;
    return openedPos;
};

const markPosition = (pos: IPosition) => {
    const markedPos = updatePos(pos);
    if (markedPos.marked === 2) markedPos.marked = 0;
    else markedPos.marked++;
    return markedPos;
};

const isValidConfig = (fieldConfig: IFieldConfig) => {
    const totalPositions = fieldConfig.width * fieldConfig.height;
    return totalPositions > fieldConfig.bombs ? true : false;
};

const allPositions = (field: IField) => field.reduce((a, b) => a.concat(b));

const countNearBombs = (field: IField) => {
    const countedField: IField = field;
    allPositions(field).map(pos => {
        if (pos.isBomb) validNearPos(field, pos).map(p => countedField[p.x][p.y].nearBombs++);
    }); // TODO immutable
    return countedField;
};

// TODO use ptz-math and help with any math method you need
const getRandomPos = (field: IField, fieldConfig: IFieldConfig) => {
    const width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
    const height = Math.floor((fieldConfig.height - 1) * Math.random() + 1);
    return field[width][height];
};

const bombPos = (field: IField, config: IFieldConfig) => {
    const pos = getRandomPos(field, config);
    if (pos.isBomb) {
        return bombPos(field, config);
    }
    pos.isBomb = true;
    return field;
};

/**
 * Populate new field with bombs
 */
const getBombedField = (field: IField, config: IFieldConfig) => {
    const fieldToBomb = R.clone(field);
    return R.last(R.range(0, config.bombs).map(() => bombPos(fieldToBomb, config)));
};

const getEmptyField = (fieldConfig: IFieldConfig) => {
    const widthRange = R.range(0, fieldConfig.width);
    const heightRange = R.range(0, fieldConfig.height);

    return widthRange.map(i => heightRange.map(j => newPos(i, j)));
};

/**
 * Get a new position
 */
const newPos = (x: number, y: number) => {
    return {
        x, y, isBomb: false, nearBombs: 0,
        opened: false, marked: 0, isValid: true
    };
};

const updatePos = (pos: IPosition) => R.clone(pos);

const getInitialField = (fieldConfig: IFieldConfig) => {
    if (!isValidConfig(fieldConfig)) throw new Error('Invalid field configuration');

    const emptyField: IField = getEmptyField(fieldConfig);

    const bombedField: IField = getBombedField(emptyField, fieldConfig);

    return countNearBombs(bombedField);
};

// TODO break in small functions
function logField(field): void {
    const countedField: IField = field;
    const indexColor = '\x1b[37m';
    const resetColor = '\x1b[0m';
    let firstLine = '    ';
    field.map((f, index) => firstLine += ' ' + (index + 1) + '  ');
    console.log(indexColor + firstLine + resetColor);
    let row: string;
    field.map((col, colIndex) => {
        var line = '|';
        row = '   ';
        col.map((pos, index) => {
            if (index === 0 && colIndex === 0)
                line = line;
            if (index === 0)
                line = ' ' + indexColor + (colIndex + 1) + resetColor + ' |';
            if (countedField[pos.x][pos.y].opened) {
                if (countedField[pos.x][pos.y].isBomb) {
                    line += '\x1b[31m * ' + resetColor;
                    row += '---';
                } else {
                    const numBombs = countedField[pos.x][pos.y].nearBombs;
                    let numBombsString;
                    switch (numBombs) {
                        case 1:
                            numBombsString = '\x1b[34m' + numBombs;
                            break;
                        case 2:
                            numBombsString = '\x1b[32m' + numBombs;
                            break;
                        case 3:
                            numBombsString = '\x1b[33m' + numBombs;
                            break;
                        case 4:
                            numBombsString = '\x1b[35m' + numBombs;
                            break;
                        case 5:
                            numBombsString = '\x1b[36m' + numBombs;
                            break;
                        case 7:
                            numBombsString = '\x1b[31m' + numBombs;
                            break;
                        case 8:
                            numBombsString = '\x1b[37m' + numBombs;
                            break;
                        default:
                            numBombsString = '\x1b[37m' + numBombs;
                    }

                    line += ' ' + numBombsString + resetColor + ' ';
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

export {
    allPositions,
    getInitialField,
    getEmptyField,
    getBombedField,
    countNearBombs,
    logField,
    markPosition,
    nearPositions,
    newPos,
    openPosition,
    positionIsValid,
    validNearPos,
    updatePos
};
