// import { IBattle, IBattleArgs } from './IBattle';
import { getInitialField } from './Field';
import { IField, IFieldConfig } from './IField';

// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});

function startBattle() {
    const fieldConfig: IFieldConfig = {
        width: 10,
        heigth: 10,
        bombs: 10
    };

    const field: IField = getInitialField(fieldConfig);
    return field;
}

export {
    startBattle
};
