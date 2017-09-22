import { ok } from 'ptz-assert';
import R from 'ramda';
import * as battle from './Battle';
import * as Field from './Field';
// import * as field from './Field';
import { IBattle } from './IBattle';
import { IFieldConfig } from './IField';
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
            const result: IBattle = battle.clickPosition(newBattle, invalidPos);
            Field.allPositions(result.field).map(p => p.opened ? opened++ : opened);

            opened.should.be.equal(0);
        });
        it('shold open if position is valid ', () => {

            const newBattle: IBattle = battle.startBattle(fieldConfig);
            let opened = 0;
            const valid: IPositionArgs = { x: 1, y: 1 };
            const result: IBattle = battle.clickPosition(newBattle, valid);
            Field.allPositions(result.field).map(p => p.opened ? opened++ : opened);

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
    });
    describe('markPosition', () => {
        let fieldConfig: IFieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('returns new battle', () => {
            const newBattle: IBattle = battle.startBattle(fieldConfig);

            const valid: IPositionArgs = { x: 1, y: 1 };
            console.log(newBattle.field[valid.x][valid.y]);
            const result: IBattle = battle.battleMarkPosition(newBattle, valid);
            console.log(result.field[valid.x][valid.y]);
            ok(result);
        });
    });
});
