import R from 'ramda';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';

/**
 * Checks if field has position.
 */
const positionIsValid = R.curry((field: IField, p: IPositionArgs) => {
    return p && p.x >= 0 && p.x < field.length && p.y >= 0 && p.y < field[0].length;
});

/**
 * Receives a pos and return his near positions
 * args {IPositionArgs}
 * returns {IPositionArgs[]}
 */
const nearPositions = (pos: IPositionArgs): IPositionArgs[] => {
    const range = R.range(-1, 2);
    /**
     * Get a 3x3 position array with the position and all the near positions then remove the position itseft
     */
    return R.flatten(R.remove(4, 1, range.map(i => range.map(j => {
        return { x: pos.x + i, y: pos.y + j };
    }))));
};

const validNearPos = R.curry((field: IField, pos: IPositionArgs): IPositionArgs[] =>
    R.filter(positionIsValid(field), nearPositions(pos)));

const openPosition = (pos: IPosition): IPosition => {
    const openedPos = pos;
    if (openedPos.marked !== 0) return openedPos;
    openedPos.opened = true;
    return openedPos;
};

const markPosition = (pos: IPosition): IPosition => {
    const markedPos = updatePos(pos);
    if (markedPos.marked === 2) markedPos.marked = 0;
    else markedPos.marked++;
    return markedPos;
};

const isValidConfig = (fieldConfig: IFieldConfig): boolean => {
    const totalPositions = fieldConfig.width * fieldConfig.height;
    return totalPositions > fieldConfig.bombs ? true : false;
};

const allPositions = (field: IField): IPosition[] => field.reduce((a, b) => a.concat(b));

const countNearBombs = (field: IField): IPosition[][] => {
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

const bombPos = (field: IField, config: IFieldConfig): IField => {
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
const getBombedField = (field: IField, config: IFieldConfig): IField => {
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

export {
    allPositions,
    getInitialField,
    getEmptyField,
    getBombedField,
    countNearBombs,
    markPosition,
    nearPositions,
    newPos,
    openPosition,
    positionIsValid,
    validNearPos,
    updatePos
};
