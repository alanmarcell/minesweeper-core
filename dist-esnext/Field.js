import { LogFile } from 'ptz-log-file';
const log = LogFile({});
function getBombs(field, fieldConfig) {
    for (let i = 0; i < fieldConfig.bombs; i++) {
        const x = Math.floor((fieldConfig.size.x - 1) * Math.random() + 1);
        const y = Math.floor((fieldConfig.size.y - 1) * Math.random() + 1);
        if (field[x][y] && field[x][y].isBomb)
            i--;
        field[x][y].isBomb = true;
    }
    return field;
}
function isValidConfig(fieldConfig) {
    const totalFields = fieldConfig.size.x * fieldConfig.size.y;
    return totalFields > fieldConfig.bombs ? true : false;
}
function getInitialField(fieldConfig) {
    try {
        if (!isValidConfig(fieldConfig)) {
            throw new Error('Invalid field configuration');
            // return;
        }
        const initialField = [];
        for (let i = 0; i < fieldConfig.size.x; i++) {
            initialField[i] = [];
            for (let j = 0; j < fieldConfig.size.y; j++) {
                const pos = { x: i, y: j, isBomb: null };
                initialField[i][j] = pos;
            }
        }
        const bombedField = getBombs(initialField, fieldConfig);
        return bombedField;
    }
    catch (err) {
        log(err);
        return err;
    }
}
export { getInitialField };
//# sourceMappingURL=Field.js.map