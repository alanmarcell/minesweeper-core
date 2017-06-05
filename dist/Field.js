'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});
function getBombs(field, fieldConfig) {
    for (var i = 0; i < fieldConfig.bombs; i++) {
        var width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
        var heigth = Math.floor((fieldConfig.heigth - 1) * Math.random() + 1);
        if (field[width][heigth] && field[width][heigth].isBomb) i--;
        field[width][heigth].isBomb = true;
    }
    return field;
}
function isValidConfig(fieldConfig) {
    var totalFields = fieldConfig.width * fieldConfig.heigth;
    return totalFields > fieldConfig.bombs ? true : false;
}
function countNearBombs(field) {
    var countedField = field;
    field.map(function (col, colIndex) {
        return col.map(function (pos, index) {
            if (pos.isBomb) {
                for (var i = -1; i < 2; i++) {
                    for (var j = -1; j < 2; j++) {
                        if (countedField[pos.x + i] && countedField[pos.x + i][pos.y + j]) countedField[pos.x + i][pos.y + j].nearBombs++;
                    }
                }
            }
        });
    });
    return countedField;
}
function getInitialField(fieldConfig) {
    if (!isValidConfig(fieldConfig)) {
        throw new Error('Invalid field configuration');
    }
    var initialField = [];
    for (var i = 0; i < fieldConfig.width; i++) {
        initialField[i] = [];
        for (var j = 0; j < fieldConfig.heigth; j++) {
            var pos = { x: i, y: j, isBomb: false, nearBombs: 0 };
            initialField[i][j] = pos;
        }
    }
    var bombedField = getBombs(initialField, fieldConfig);
    return bombedField;
}
exports.getInitialField = getInitialField;
exports.countNearBombs = countNearBombs;
//# sourceMappingURL=Field.js.map
//# sourceMappingURL=Field.js.map