import { ok } from 'ptz-assert';
import * as battle from './Battle';

describe('Battle', () => {
    describe('startBattle', () => {
        it('returns new battle', () => {
            const result = battle.startBattle();
            ok(result);
        });
    });
});
