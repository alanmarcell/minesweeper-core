import { ok } from 'ptz-assert';
import * as battle from './Battle';

// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});
// This are some tests examples
describe('Battle', () => {
    describe('funcTest', () => {
        it('returns true', () => {
            const result = battle.startBattle();
            ok(result);
        });
    });
});
