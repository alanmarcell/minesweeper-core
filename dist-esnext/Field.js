// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});
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
function getInitialField(fieldConfig) {
    if (!isValidConfig(fieldConfig)) {
        throw new Error('Invalid field configuration');
    }
    const initialField = [];
    for (let i = 0; i < fieldConfig.width; i++) {
        initialField[i] = [];
        for (let j = 0; j < fieldConfig.heigth; j++) {
            const pos = { x: i, y: j, isBomb: false, nearBombs: 0 };
            initialField[i][j] = pos;
        }
    }
    const bombedField = getBombs(initialField, fieldConfig);
    return bombedField;
}
export { getInitialField, countNearBombs };
//# sourceMappingURL=Field.js.map