import { ok } from 'ptz-assert';
import * as battle from './Battle';
// import * as field from './Field';
import { IBattle } from './IBattle';

describe('Battle', () => {
    describe('startBattle', () => {
        it('returns new battle', () => {
            const result: IBattle = battle.startBattle();
            ok(result);
        });
    });
});
