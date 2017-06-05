'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startBattle = undefined;

var _Field = require('./Field');

// import { LogFile } from 'ptz-log-file';
// const log = LogFile({});
function startBattle() {
    var fieldConfig = {
        width: 10,
        heigth: 10,
        bombs: 10
    };
    var field = (0, _Field.getInitialField)(fieldConfig);
    return field;
} // import { IBattle, IBattleArgs } from './IBattle';
exports.startBattle = startBattle;
//# sourceMappingURL=Battle.js.map
//# sourceMappingURL=Battle.js.map