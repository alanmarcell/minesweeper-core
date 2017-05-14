'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInitialField = undefined;

var _ptzLogFile = require('ptz-log-file');

var log = (0, _ptzLogFile.LogFile)({});
function getBombs(field, fieldConfig) {
    for (var i = 0; i < fieldConfig.bombs; i++) {
        var x = Math.floor((fieldConfig.size.x - 1) * Math.random() + 1);
        var y = Math.floor((fieldConfig.size.y - 1) * Math.random() + 1);
        if (field[x][y] && field[x][y].isBomb) i--;
        field[x][y].isBomb = true;
    }
    return field;
}
function isValidConfig(fieldConfig) {
    var totalFields = fieldConfig.size.x * fieldConfig.size.y;
    return totalFields > fieldConfig.bombs ? true : false;
}
function getInitialField(fieldConfig) {
    try {
        if (!isValidConfig(fieldConfig)) {
            throw new Error('Invalid field configuration');
            // return;
        }
        var initialField = [];
        for (var i = 0; i < fieldConfig.size.x; i++) {
            initialField[i] = [];
            for (var j = 0; j < fieldConfig.size.y; j++) {
                var pos = { x: i, y: j, isBomb: null };
                initialField[i][j] = pos;
            }
        }
        var bombedField = getBombs(initialField, fieldConfig);
        return bombedField;
    } catch (err) {
        log(err);
        return err;
    }
}
exports.getInitialField = getInitialField;
//# sourceMappingURL=Field.js.map
//# sourceMappingURL=Field.js.map