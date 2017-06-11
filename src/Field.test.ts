import chai from 'chai';
import * as a from 'chai';
// import R from 'ramda';
// import { LogFile } from 'ptz-log-file';
import * as Field from './Field';
import { IField, IFieldConfig } from './IField';
import { IPosition, IPositionArgs } from './IPosition';
const should = a.should();
chai.should();

// import { IPosition } from './IPosition';
// const log = LogFile({});

describe('getInitialField', () => {
    let fieldConfig: IFieldConfig;
    let initialField: IField;
    const validPos: IPositionArgs = {
        x: 0,
        y: 0
    };
    beforeEach(() => {
        fieldConfig = {
            bombs: 9, width: 9, height: 9
        };
        initialField = Field.getInitialField(fieldConfig);
        initialField.should.be.an('array');
    });
    describe('Field', () => {
        it('bombs in the field should match fieldConfig bombs', () => {
            var bombs = 0;
            Field.allPositions(initialField).map(p => p.isBomb ? bombs++ : bombs);
            bombs.should.be.equal(fieldConfig.bombs);
        });
        it('should field size match fieldConfig size', () => {
            initialField.length.should.be.equal(fieldConfig.width);
            initialField[0].length.should.be.equal(fieldConfig.height);
        });
        it('should throw an error if bombs number is bigger than fild size', () => {
            try {
                const invalidFieldConfig = {
                    bombs: 27, width: 5, height: 5
                };
                should.not.exist(initialField = Field.getInitialField(invalidFieldConfig));
            } catch (e) {
                e.should.be.an('error');
            }
        });
        it('count near bombs', () => {
            initialField = Field.getInitialField(fieldConfig);
            const countedField = Field.countNearBombs(initialField);
            countedField.should.be.an('array');
        });
    });
    describe('openPosition', () => {
        it('should return a opened position', () => {
            const closedPosition: IPosition = Field.newPos(1, 1);
            const openedPosition: IPosition = Field.openPosition(closedPosition);
            // tslint:disable-next-line:no-unused-expression
            openedPosition.opened.should.be.true;
        });
        it('should return a opened position', () => {
            const invalidPosition: IPosition = Field.newPos(-1, 1);
            const openedPosition: IPosition = Field.openPosition(invalidPosition);
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
    describe.skip('positionIsValid', () => {
        it('should return true if position is valid', () => {
            Field.positionIsValid(initialField, validPos);
        });
        it('should return false if position is valid', () => {
            //
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
