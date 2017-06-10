'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getBombs(field, fieldConfig) {
    for (var i = 0; i < fieldConfig.bombs; i++) {
        var width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
        var heigth = Math.floor((fieldConfig.heigth - 1) * Math.random() + 1);
        if (field[width][heigth] && field[width][heigth].isBomb) i--;
        field[width][heigth].isBomb = true;
    }
    return field;
}
function nearPositions(pos) {
    // tslint:disable-next-line:prefer-const
    var arrayPos = [];
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            arrayPos.push({ x: pos.x + i, y: pos.y + j });
        }
    }
    return arrayPos;
}
function isValidConfig(fieldConfig) {
    var totalPositions = fieldConfig.width * fieldConfig.heigth;
    return totalPositions > fieldConfig.bombs ? true : false;
}
function countNearBombs(field) {
    var countedField = field;
    field.map(function (col) {
        return col.map(function (pos) {
            if (pos.isBomb) nearPositions(pos).map(function (p) {
                if (countedField[p.x] && countedField[p.x][p.y]) countedField[p.x][p.y].nearBombs++;
            });
        });
    });
    console.log('countedField ----');
    logField(countedField);
    return countedField;
}
function getEmptyField(fieldConfig) {
    var initialField = [];
    for (var i = 0; i < fieldConfig.width; i++) {
        initialField[i] = [];
        for (var j = 0; j < fieldConfig.heigth; j++) {
            var pos = {
                x: i, y: j, isBomb: false, nearBombs: 0,
                opened: false, marked: 0, isValid: true
            };
            initialField[i][j] = pos;
        }
    }
    return initialField;
}
function logField(field) {
    var countedField = field;
    var firstLine = '   |';
    field.map(function (f, index) {
        return firstLine += ' ' + (index + 1) + ' |';
    });
    console.log(firstLine);
    var row = void 0;
    field.map(function (col, colIndex) {
        var line = '|';
        row = '   ';
        col.map(function (pos, index) {
            if (index === 0 && colIndex === 0) line = line;
            if (index === 0) line = ' ' + (colIndex + 1) + ' |';
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
function getInitialField(fieldConfig) {
    if (!isValidConfig(fieldConfig)) throw new Error('Invalid field configuration');
    var emptyField = getEmptyField(fieldConfig);
    var bombedField = getBombs(emptyField, fieldConfig);
    var countedField = countNearBombs(bombedField);
    return countedField;
}
exports.getInitialField = getInitialField;
exports.countNearBombs = countNearBombs;
exports.logField = logField;
exports.nearPositions = nearPositions;
//# sourceMappingURL=Field.js.map
//# sourceMappingURL=Field.js.map