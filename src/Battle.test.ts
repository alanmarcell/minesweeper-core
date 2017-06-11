import { ok } from 'ptz-assert';
import * as battle from './Battle';
// import * as field from './Field';
import { IBattle } from './IBattle';
import { IFieldConfig } from './IField';

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
});
