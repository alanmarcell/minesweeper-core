import { equal } from 'ptz-assert';
import { addTest } from './index';
describe('minesweeper', () => {
    describe('addTest', () => {
        it('2 + 3 = 5', () => {
            const sum = addTest(2, 3);
            equal(sum, 5);
        });
    });
});
//# sourceMappingURL=index.test.js.map