import { equal, ok } from 'ptz-assert';
// import { LogFile } from 'ptz-log-file';
import * as field from './Field';
// import { IPosition } from './IPosition';
// const log = LogFile({});
describe('Field', () => {
    describe('getInitialField', () => {
        var fieldConfig;
        var initialField;
        beforeEach(() => {
            fieldConfig = {
                bombs: 5,
                size: { x: 5, y: 5 }
            };
            initialField = field.getInitialField(fieldConfig);
        });
        it('bombs in the field should match fieldConfig bombs', () => {
            var bombs = 0;
            initialField.map(col => col.map(pos => pos.isBomb ? bombs++ : bombs));
            equal(bombs, fieldConfig.bombs);
        });
        it('field size should match fieldConfig size', () => {
            equal(initialField.length, fieldConfig.size.x);
            equal(initialField[0].length, fieldConfig.size.y);
        });
        it('should throw an error if bombs number is bigger than fild size', () => {
            fieldConfig = {
                bombs: 27,
                size: { x: 5, y: 5 }
            };
            initialField = field.getInitialField(fieldConfig);
            ok(initialField);
        });
    });
});
//# sourceMappingURL=Field.test.js.map