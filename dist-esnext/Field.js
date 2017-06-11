import R from 'ramda';
const positionIsValid = R.curry((field, position) => {
    return position.x >= 0 && position.x < field.length && position.y >= 0 && position.y < field[0].length;
});
/**
 * Receives a pos and return his near positions
 * args {IPositionArgs}
 * returns {IPositionArgs[]}
 */
const nearPositions = (pos) => {
    const range = R.range(-1, 2);
    /**
     * Get a 3x3 position array with the position and all the near positions then remove the position itseft
     */
    const arrayPos = R.remove(4, 1, range.map(i => range.map(j => {
        const p = { x: pos.x + i, y: pos.y + j };
        return p;
    })));
    return arrayPos.reduce((a, b) => a.concat(b));
};
const validNearPos = (field, pos) => R.filter(positionIsValid(field), nearPositions(pos));
const curriedValidNearPos = R.curry(validNearPos);
const openPosition = (pos) => {
    pos.opened = true;
    return pos;
};
function isValidConfig(fieldConfig) {
    const totalPositions = fieldConfig.width * fieldConfig.height;
    return totalPositions > fieldConfig.bombs ? true : false;
}
const allPositions = (field) => field.reduce((a, b) => a.concat(b));
function countNearBombs(field) {
    const countedField = field;
    allPositions(field).map(pos => {
        if (pos.isBomb)
            validNearPos(field, pos).map(p => countedField[p.x][p.y].nearBombs++);
    });
    return countedField;
}
const getRandomPos = (field, fieldConfig) => {
    const width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
    const height = Math.floor((fieldConfig.height - 1) * Math.random() + 1);
    return field[width][height];
};
/**
 * Populate new field with bombs
 */
const getBombs = (field, fieldConfig) => {
    for (let i = 0; i < fieldConfig.bombs; i++) {
        const pos = getRandomPos(field, fieldConfig);
        if (pos && pos.isBomb)
            i--;
        pos.isBomb = true;
    }
    return field;
};
const getEmptyField = (fieldConfig) => {
    const widthRange = R.range(0, fieldConfig.width);
    const heightRange = R.range(0, fieldConfig.height);
    return widthRange.map(i => heightRange.map(j => newPos(i, j)));
};
/**
 * Get a new position
 */
const newPos = (i, j) => {
    return {
        x: i, y: j, isBomb: false, nearBombs: 0,
        opened: false, marked: 0, isValid: true
    };
};
function getInitialField(fieldConfig) {
    if (!isValidConfig(fieldConfig))
        throw new Error('Invalid field configuration');
    const emptyField = getEmptyField(fieldConfig);
    const bombedField = getBombs(emptyField, fieldConfig);
    return countNearBombs(bombedField);
}
function logField(field) {
    const countedField = field;
    const indexColor = '\x1b[37m';
    const resetColor = '\x1b[0m';
    let firstLine = '    ';
    field.map((f, index) => firstLine += ' ' + (index + 1) + '  ');
    console.log(indexColor + firstLine + resetColor);
    let row;
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
                }
                else {
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
                            numBombsString = ' ';
                    }
                    line += ' ' + numBombsString + resetColor + ' ';
                    row += '---';
                }
            }
            else {
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
export { getInitialField, countNearBombs, logField, nearPositions, newPos, openPosition, positionIsValid, curriedValidNearPos, validNearPos, allPositions };
//# sourceMappingURL=Field.js.map