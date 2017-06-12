import chai from 'chai';
import * as a from 'chai';
import R from 'ramda';
// import { LogFile } from 'ptz-log-file';
import * as Field from './Field';
const should = a.should();
chai.should();
// import { IPosition } from './IPosition';
// const log = LogFile({});'
const validFieldConfig = { bombs: 9, width: 9, height: 9 };
const invalidFieldConfig = { bombs: 27, width: 5, height: 5 };
const validPos = { x: 0, y: 0 };
const invalidPos = { x: -1, y: -1 };
const initialField = Field.getInitialField(validFieldConfig);
const emptyField = Field.getEmptyField(validFieldConfig);
describe('Field', () => {
    describe('getEmptyField', () => {
        emptyField.should.be.an('array');
        it.skip('should have no bombs', () => {
            let bombs = 0;
            Field.allPositions(emptyField).map(p => p.isBomb ? bombs++ : bombs);
            bombs.should.be.equal(0);
        });
        it('should field size match fieldConfig size', () => {
            emptyField.length.should.be.equal(validFieldConfig.width);
            emptyField[0].length.should.be.equal(validFieldConfig.height);
        });
    });
    describe('getBombedField', () => {
        const bombedField = Field.getBombedField(emptyField, validFieldConfig);
        bombedField.should.be.an('array');
        it('should match bombs in the field with fieldConfig bombs', () => {
            let bombs = 0;
            Field.allPositions(bombedField).map(p => p.isBomb ? bombs++ : bombs);
            bombs.should.be.equal(validFieldConfig.bombs);
        });
        it('should throw an error if bombs number is bigger than fild size', () => {
            try {
                const invalidField = Field.getInitialField(invalidFieldConfig);
                should.not.exist(invalidField);
            }
            catch (e) {
                e.should.be.an('error');
            }
        });
    });
    describe('countNearBombs', () => {
        it('should increase near bombs', () => {
            const countedField = Field.countNearBombs(initialField);
            const flattenField = R.flatten(countedField);
            const isBombeb = (pos) => pos.isBomb;
            const bombedPos = R.find(isBombeb, flattenField);
            const nearBombebPos = (pos) => Field.validNearPos(initialField, pos);
            nearBombebPos(bombedPos).map(p => countedField[p.x][p.y].nearBombs.should.be.above(0));
            countedField.should.be.an('array');
        });
    });
    describe('openPosition', () => {
        it('should return a opened position', () => {
            const closedPosition = Field.newPos(1, 1);
            const openedPosition = Field.openPosition(closedPosition);
            // tslint:disable-next-line:no-unused-expression
            openedPosition.opened.should.be.true;
        });
    });
    describe('nearPositions', () => {
        it('should return near positions', () => {
            const nearPos = Field.nearPositions(validPos);
            nearPos.should.be.an('array');
        });
    });
    describe('positionIsValid', () => {
        it('should return true if position is valid', () => {
            const isValid = Field.positionIsValid(initialField, validPos);
            // tslint:disable-next-line:no-unused-expression
            isValid.should.be.true;
        });
        it('should return false if position is invalid', () => {
            const isValid = Field.positionIsValid(initialField, invalidPos);
            // tslint:disable-next-line:no-unused-expression
            isValid.should.be.false;
        });
    });
    describe('validNearPositions', () => {
        it('should return only valid near positions', () => {
            const nearPos = Field.validNearPos(initialField, validPos);
            const validateFn = (np) => np.map(Field.positionIsValid(initialField));
            const validatedpos = validateFn(nearPos);
            validatedpos.map(p => p.should.be.true);
            nearPos.should.be.an('array');
        });
    });
});
//# sourceMappingURL=Field.test.js.map