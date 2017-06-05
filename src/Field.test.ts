import { equal, ok } from 'ptz-assert';
// import { LogFile } from 'ptz-log-file';
import * as field from './Field';
import { IField, IFieldConfig } from './IField';

// import { IPosition } from './IPosition';
// const log = LogFile({});

describe('Field', () => {
    describe('getInitialField', () => {
        var fieldConfig: IFieldConfig;
        var initialField: IField;
        beforeEach(() => {
            fieldConfig = {
                bombs: 5, width: 5, heigth: 5
            };
            initialField = field.getInitialField(fieldConfig);
        });
        it('bombs in the field should match fieldConfig bombs', () => {
            var bombs = 0;
            initialField.map(col => col.map(pos => pos.isBomb ? bombs++ : bombs));
            equal(bombs, fieldConfig.bombs);
        });
        it('should field size match fieldConfig size', () => {
            equal(initialField.length, fieldConfig.width);
            equal(initialField[0].length, fieldConfig.heigth);
        });
        it('should throw an error if bombs number is bigger than fild size', () => {
            try {
                const invalidFieldConfig = {
                    bombs: 27, width: 5, heigth: 5
                };
                initialField = field.getInitialField(invalidFieldConfig);
            } catch (e) {
                ok(e);
            }
        });
        it('count near bombs', () => {
            initialField = field.getInitialField(fieldConfig);
            const countedField = field.countNearBombs(initialField);
            ok(countedField);
        });
    });
});
