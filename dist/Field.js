'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nearPositions = exports.logField = exports.countNearBombs = exports.getInitialField = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Populate new field with bombs
 */
var getBombs = function getBombs(field, fieldConfig) {
    for (var i = 0; i < fieldConfig.bombs; i++) {
        var width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
        var height = Math.floor((fieldConfig.height - 1) * Math.random() + 1);
        if (field[width][height] && field[width][height].isBomb) i--;
        field[width][height].isBomb = true;
    }
    return field;
};
/**
 * Receives a pos and return his near positions
 * args {IPositionArgs}
 * returns {IPositionArgs[]}
 */
var nearPositions = function nearPositions(pos) {
    var range = _ramda2.default.range(-1, 2);
    /**
     * Get a 3x3 position array with the position and all the near positions then remove the position itseft
     */
    var arrayPos = _ramda2.default.remove(4, 1, range.map(function (i) {
        return range.map(function (j) {
            return { x: pos.x + i, y: pos.y + j };
        });
    }));
    return arrayPos.reduce(function (a, b) {
        return a.concat(b);
    });
};
function isValidConfig(fieldConfig) {
    var totalPositions = fieldConfig.width * fieldConfig.height;
    return totalPositions > fieldConfig.bombs ? true : false;
}
var allPositions = function allPositions(field) {
    return field.reduce(function (a, b) {
        return a.concat(b);
    });
};
function countNearBombs(field) {
    var countedField = field;
    allPositions(field).map(function (pos) {
        if (pos.isBomb) nearPositions(pos).map(function (p) {
            if (countedField[p.x] && countedField[p.x][p.y]) countedField[p.x][p.y].nearBombs++;
        });
    });
    return countedField;
}
var getEmptyField = function getEmptyField(fieldConfig) {
    var widthRange = _ramda2.default.range(0, fieldConfig.width);
    var heightRange = _ramda2.default.range(0, fieldConfig.height);
    return widthRange.map(function (i) {
        return heightRange.map(function (j) {
            return newPos(i, j);
        });
    });
};
/**
 * Get a new position
 */
var newPos = function newPos(i, j) {
    return {
        x: i, y: j, isBomb: false, nearBombs: 0,
        opened: false, marked: 0, isValid: true
    };
};
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
    return countNearBombs(bombedField);
}
exports.getInitialField = getInitialField;
exports.countNearBombs = countNearBombs;
exports.logField = logField;
exports.nearPositions = nearPositions;
//# sourceMappingURL=Field.js.map
//# sourceMappingURL=Field.js.map