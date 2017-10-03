import { ok } from 'ptz-assert';
import R from 'ramda';
import * as battle from './Battle';
import * as Field from './Field';
import { IBattle } from './IBattle';
import { IFieldConfig } from './IField';
// import { log } from './index';
import { IPositionArgs } from './IPosition';

describe('Battle', () => {
    describe('startBattle', () => {
        let fieldConfig: IFieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('returns new battle', () => {
            const result: IBattle = battle.startBattle(fieldConfig);
            ok(result);
        });
    });
    describe('clickPosition', () => {
        let fieldConfig: IFieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('shold not open if position is invalid ', () => {

            const newBattle: IBattle = battle.startBattle(fieldConfig);
            let opened = 0;
            const invalidPos: IPositionArgs = { x: -1, y: -1 };
            const resultBattle: IBattle = battle.clickPosition(newBattle, invalidPos);
            Field.allPositions(resultBattle.field).map(p => p.opened ? opened++ : opened);

            opened.should.be.equal(0);
        });
        it('shold open if position is valid ', () => {

            const newBattle: IBattle = battle.startBattle(fieldConfig);
            let opened = 0;
            const valid: IPositionArgs = { x: 1, y: 1 };
            const resultBattle: IBattle = battle.clickPosition(newBattle, valid);
            Field.allPositions(resultBattle.field).map(p => p.opened ? opened++ : opened);
            // resultBattle.should.not.be.equal(newBattle);
            opened.should.not.be.equal(0);
        });
        it('shold not open if position is open', () => {

            const newBattle: IBattle = battle.startBattle(fieldConfig);
            let openedFirst = 0;
            let openedSecond = 0;
            const valid: IPositionArgs = { x: 1, y: 1 };
            const result: IBattle = battle.clickPosition(newBattle, valid);

            const result2: IBattle = battle.clickPosition(result, valid);
            Field.allPositions(result.field).map(p => p.opened ? openedFirst++ : openedFirst);
            Field.allPositions(result2.field).map(p => p.opened ? openedSecond++ : openedSecond);

            openedFirst.should.be.equal(openedSecond);
        });
        it('shold open if position is not open', () => {

            const newBattle: IBattle = battle.startBattle(fieldConfig);
            let openedFirst = 0;
            let openedSecond = 0;
            const valid: IPositionArgs = { x: 1, y: 1 };
            const result: IBattle = battle.clickPosition(newBattle, valid);
            let valid2;
            valid2 = R.find(R.propEq('opened', false), Field.allPositions(result.field));
            Field.allPositions(result.field).map(p => p.opened ? openedFirst++ : openedFirst);
            const result2: IBattle = battle.clickPosition(result, valid2);

            Field.allPositions(result2.field).map(p => p.opened ? openedSecond++ : openedSecond);

            openedFirst.should.be.not.equal(openedSecond);
        });
        it('shold open if position is not marked', () => {
            const newBattle: IBattle = battle.startBattle(fieldConfig);

            const valid: IPositionArgs = { x: 1, y: 1 };
            const clicked: IBattle = battle.clickPosition(newBattle, valid);

            clicked.field[valid.x][valid.y].opened.should.be.equal(true);
            clicked.field[valid.x][valid.y].marked.should.be.equal(0);
            ok(clicked);
        });
        it('shold not open if position is marked', () => {
            const newBattle: IBattle = battle.startBattle(fieldConfig);

            const valid: IPositionArgs = { x: 1, y: 1 };
            const marked: IBattle = battle.battleMarkPosition(newBattle, valid);

            const clicked: IBattle = battle.clickPosition(marked, valid);

            clicked.field[valid.x][valid.y].opened.should.be.equal(false);
            clicked.field[valid.x][valid.y].marked.should.be.equal(1);
            ok(clicked);
        });
    });

    describe('markPosition', () => {
        let fieldConfig: IFieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('should mark pos if not open', () => {
            const newBattle: IBattle = battle.startBattle(fieldConfig);

            const valid: IPositionArgs = { x: 1, y: 1 };
            const result: IBattle = battle.battleMarkPosition(newBattle, valid);

            result.field[valid.x][valid.y].marked.should.be.equal(1);
            ok(result);
        });
        it('should not mark pos if open', () => {
            const newBattle: IBattle = battle.startBattle(fieldConfig);

            const valid: IPositionArgs = { x: 1, y: 1 };
            const clicked: IBattle = battle.clickPosition(newBattle, valid);
            const marked: IBattle = battle.battleMarkPosition(clicked, valid);

            marked.field[valid.x][valid.y].opened.should.be.equal(true);
            marked.field[valid.x][valid.y].marked.should.be.equal(0);
            ok(marked);
        });
    });
    describe('openNearPositions', () => {
        let fieldConfig: IFieldConfig;
        before('Set field config', () => {
            console.log('Set field config');
            fieldConfig = {
                bombs: 3, width: 3, height: 3
            };
        });
        it('should openNearPositions', () => {
            const newBattle: IBattle = battle.startBattle(fieldConfig);
            const valid: IPositionArgs = { x: 2, y: 2 };

            const result: IBattle = battle.openNearPositions(newBattle, valid);
            const nearPositions = Field.validNearPos(result.field, valid);

            let opened = 0;
            nearPositions.map(p => {
                if (result.field[p.x][p.y].opened)
                    opened++;
            });

            opened.should.be.equal(nearPositions.length);
        });
    });
});
