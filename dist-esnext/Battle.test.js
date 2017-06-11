import { ok } from 'ptz-assert';
import * as battle from './Battle';
describe('Battle', () => {
    describe('startBattle', () => {
        let fieldConfig;
        before('Set field config', () => {
            fieldConfig = {
                bombs: 9, width: 9, height: 9
            };
        });
        it('returns new battle', () => {
            const result = battle.startBattle(fieldConfig);
            ok(result);
        });
    });
});
//# sourceMappingURL=Battle.test.js.map