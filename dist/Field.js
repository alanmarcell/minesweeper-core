'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePos = exports.validNearPos = exports.positionIsValid = exports.openPosition = exports.newPos = exports.nearPositions = exports.markPosition = exports.logField = exports.countNearBombs = exports.getBombedField = exports.getEmptyField = exports.getInitialField = exports.allPositions = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if field has position.
 */
var positionIsValid = _ramda2.default.curry(function (field, p) {
    return p.x >= 0 && p.x < field.length && p.y >= 0 && p.y < field[0].length;
});
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
    return _ramda2.default.flatten(_ramda2.default.remove(4, 1, range.map(function (i) {
        return range.map(function (j) {
            return { x: pos.x + i, y: pos.y + j };
        });
    })));
};
var validNearPos = _ramda2.default.curry(function (field, pos) {
    return _ramda2.default.filter(positionIsValid(field), nearPositions(pos));
});
var openPosition = function openPosition(pos) {
    var openedPos = pos;
    openedPos.opened = true;
    return openedPos;
};
var markPosition = function markPosition(pos) {
    var markedPos = updatePos(pos);
    if (markedPos.marked === 2) markedPos.marked = 0;else markedPos.marked++;
    return markedPos;
};
var isValidConfig = function isValidConfig(fieldConfig) {
    var totalPositions = fieldConfig.width * fieldConfig.height;
    return totalPositions > fieldConfig.bombs ? true : false;
};
var allPositions = function allPositions(field) {
    return field.reduce(function (a, b) {
        return a.concat(b);
    });
};
var countNearBombs = function countNearBombs(field) {
    var countedField = field;
    allPositions(field).map(function (pos) {
        if (pos.isBomb) validNearPos(field, pos).map(function (p) {
            return countedField[p.x][p.y].nearBombs++;
        });
    }); // TODO immutable
    return countedField;
};
// TODO use ptz-math and help with any math method you need
var getRandomPos = function getRandomPos(field, fieldConfig) {
    var width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
    var height = Math.floor((fieldConfig.height - 1) * Math.random() + 1);
    return field[width][height];
};
var bombPos = function bombPos(field, config) {
    var pos = getRandomPos(field, config);
    if (pos.isBomb) {
        return bombPos(field, config);
    }
    pos.isBomb = true;
    return field;
};
/**
 * Populate new field with bombs
 */
var getBombedField = function getBombedField(field, config) {
    return _ramda2.default.last(_ramda2.default.range(0, config.bombs).map(function () {
        return bombPos(field, config);
    }));
};
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
var newPos = function newPos(x, y) {
    return {
        x: x, y: y, isBomb: false, nearBombs: 0,
        opened: false, marked: 0, isValid: true
    };
};
var updatePos = function updatePos(pos) {
    return _ramda2.default.clone(pos);
};
var getInitialField = function getInitialField(fieldConfig) {
    if (!isValidConfig(fieldConfig)) throw new Error('Invalid field configuration');
    var emptyField = getEmptyField(fieldConfig);
    var bombedField = getBombedField(emptyField, fieldConfig);
    return countNearBombs(bombedField);
};
// TODO break in small functions
function logField(field) {
    var countedField = field;
    var indexColor = '\x1b[37m';
    var resetColor = '\x1b[0m';
    var firstLine = '    ';
    field.map(function (f, index) {
        return firstLine += ' ' + (index + 1) + '  ';
    });
    console.log(indexColor + firstLine + resetColor);
    var row = void 0;
    field.map(function (col, colIndex) {
        var line = '|';
        row = '   ';
        col.map(function (pos, index) {
            if (index === 0 && colIndex === 0) line = line;
            if (index === 0) line = ' ' + indexColor + (colIndex + 1) + resetColor + ' |';
            if (countedField[pos.x][pos.y].opened) {
                if (countedField[pos.x][pos.y].isBomb) {
                    line += '\x1b[31m * ' + resetColor;
                    row += '---';
                } else {
                    var numBombs = countedField[pos.x][pos.y].nearBombs;
                    var numBombsString = void 0;
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
exports.allPositions = allPositions;
exports.getInitialField = getInitialField;
exports.getEmptyField = getEmptyField;
exports.getBombedField = getBombedField;
exports.countNearBombs = countNearBombs;
exports.logField = logField;
exports.markPosition = markPosition;
exports.nearPositions = nearPositions;
exports.newPos = newPos;
exports.openPosition = openPosition;
exports.positionIsValid = positionIsValid;
exports.validNearPos = validNearPos;
exports.updatePos = updatePos;
//# sourceMappingURL=Field.js.map
//# sourceMappingURL=Field.js.map