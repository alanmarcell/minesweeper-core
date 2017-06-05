// import R from 'ramda';
import { IField, IFieldConfig } from './IField';
import { IPosition } from './IPosition';

// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});

function getBombs(field: IField, fieldConfig: IFieldConfig): IField {
    for (let i = 0; i < fieldConfig.bombs; i++) {
        const width = Math.floor((fieldConfig.width - 1) * Math.random() + 1);
        const heigth = Math.floor((fieldConfig.heigth - 1) * Math.random() + 1);
        if (field[width][heigth] && field[width][heigth].isBomb)
            i--;
        field[width][heigth].isBomb = true;
    }
    return field;
}

function isValidConfig(fieldConfig: IFieldConfig) {
    const totalFields = fieldConfig.width * fieldConfig.heigth;
    return totalFields > fieldConfig.bombs ? true : false;
}

function countNearBombs(field: IField): IField {
    const countedField: IField = field;
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

function getEmptyField(fieldConfig: IFieldConfig) {
    const initialField = [];
    for (let i = 0; i < fieldConfig.width; i++) {
        initialField[i] = [];
        for (let j = 0; j < fieldConfig.heigth; j++) {
            const pos: IPosition = { x: i, y: j, isBomb: false, nearBombs: 0, opened: false, marked: 0 };
            initialField[i][j] = pos;
        }
    }
    return initialField;
}

function logField(field) {
    const countedField: IField = field;
    let firstLine = '   |';
    field.map((f, index) => firstLine += ' ' + (index + 1) + ' |');
    console.log(firstLine);
    let row: string;
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
    console.log(row);
}

function getInitialField(fieldConfig: IFieldConfig): IField {

    if (!isValidConfig(fieldConfig)) {
        throw new Error('Invalid field configuration');
    }
    const emptyField = getEmptyField(fieldConfig);
    const bombedField: IField = getBombs(emptyField, fieldConfig);
    const countedField = countNearBombs(bombedField);
    return countedField;
}

export {
    getInitialField, countNearBombs, logField
};
