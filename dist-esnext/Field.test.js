import chai from 'chai';
import * as a from 'chai';
// import { LogFile } from 'ptz-log-file';
import * as field from './Field';
const should = a.should();
chai.should();
// import { IPosition } from './IPosition';
// const log = LogFile({});
describe('Field', () => {
    describe('getInitialField', () => {
        var fieldConfig;
        var initialField;
        beforeEach(() => {
            fieldConfig = {
                bombs: 5, width: 5, heigth: 5
            };
            initialField = field.getInitialField(fieldConfig);
            initialField.should.be.an('array');
        });
        it('bombs in the field should match fieldConfig bombs', () => {
            var bombs = 0;
            initialField.map(col => col.map(pos => pos.isBomb ? bombs++ : bombs));
            bombs.should.be.equal(fieldConfig.bombs);
        });
        it('should field size match fieldConfig size', () => {
            initialField.length.should.be.equal(fieldConfig.width);
            initialField[0].length.should.be.equal(fieldConfig.heigth);
        });
        it('should throw an error if bombs number is bigger than fild size', () => {
            try {
                const invalidFieldConfig = {
                    bombs: 27, width: 5, heigth: 5
                };
                should.not.exist(initialField = field.getInitialField(invalidFieldConfig));
            }
            catch (e) {
                e.should.be.an('error');
            }
        });
        it('count near bombs', () => {
            initialField = field.getInitialField(fieldConfig);
            const countedField = field.countNearBombs(initialField);
            countedField.should.be.an('array');
        });
    });
});
//# sourceMappingURL=Field.test.js.map