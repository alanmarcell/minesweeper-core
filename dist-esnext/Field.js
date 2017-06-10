function getBombs(field, fieldConfig) {
    for (let i = 0; i < fieldConfig.bombs; i++) {
        const width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
        const heigth = Math.floor((fieldConfig.heigth - 1) * Math.random() + 1);
        if (field[width][heigth] && field[width][heigth].isBomb)
            i--;
        field[width][heigth].isBomb = true;
    }
    return field;
}
function isValidConfig(fieldConfig) {
    const totalFields = fieldConfig.width * fieldConfig.heigth;
    return totalFields > fieldConfig.bombs ? true : false;
}
function countNearBombs(field) {
    const countedField = field;
    field.map((col, colIndex) => col.map((pos, index) => {
        if (pos.isBomb) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (countedField[pos.x + i] && countedField[pos.x + i][pos.y + j])
                        countedField[pos.x + i][pos.y + j].nearBombs++;
                }
            }
        }
    }));
    return countedField;
}
function getEmptyField(fieldConfig) {
    const initialField = [];
    for (let i = 0; i < fieldConfig.width; i++) {
        initialField[i] = [];
        for (let j = 0; j < fieldConfig.heigth; j++) {
            const pos = {
                x: i, y: j, isBomb: false, nearBombs: 0,
                opened: false, marked: 0, isValid: true
            };
            initialField[i][j] = pos;
        }
    }
    return initialField;
}
function logField(field) {
    const countedField = field;
    let firstLine = '   |';
    field.map((f, index) => firstLine += ' ' + (index + 1) + ' |');
    console.log(firstLine);
    let row;
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
                }
                else {
                    line += ' ' + countedField[pos.x][pos.y].nearBombs + ' ';
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
function getInitialField(fieldConfig) {
    if (!isValidConfig(fieldConfig)) {
        throw new Error('Invalid field configuration');
    }
    const emptyField = getEmptyField(fieldConfig);
    const bombedField = getBombs(emptyField, fieldConfig);
    const countedField = countNearBombs(bombedField);
    return countedField;
}
export { getInitialField, countNearBombs, logField };
//# sourceMappingURL=Field.js.map