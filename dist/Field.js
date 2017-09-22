'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePos = exports.validNearPos = exports.positionIsValid = exports.openPosition = exports.newPos = exports.nearPositions = exports.markPosition = exports.countNearBombs = exports.getBombedField = exports.getEmptyField = exports.getInitialField = exports.allPositions = undefined;

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
    console.log('MARKPOS FIELD');
    console.log('MARKED FIELD POS', pos);
    var markedPos = updatePos(pos);
    if (markedPos.marked === 2) markedPos.marked = 0;else markedPos.marked++;
    console.log('MARKED FIELD POS', markedPos);
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
    var fieldToBomb = _ramda2.default.clone(field);
    return _ramda2.default.last(_ramda2.default.range(0, config.bombs).map(function () {
        return bombPos(fieldToBomb, config);
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
exports.allPositions = allPositions;
exports.getInitialField = getInitialField;
exports.getEmptyField = getEmptyField;
exports.getBombedField = getBombedField;
exports.countNearBombs = countNearBombs;
exports.markPosition = markPosition;
exports.nearPositions = nearPositions;
exports.newPos = newPos;
exports.openPosition = openPosition;
exports.positionIsValid = positionIsValid;
exports.validNearPos = validNearPos;
exports.updatePos = updatePos;
//# sourceMappingURL=Field.js.map
//# sourceMappingURL=Field.js.map