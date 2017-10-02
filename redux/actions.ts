const actions = {
    START_BATTLE: 'START_BATTLE',
    OPEN_NEAR_POSITIONS: 'OPEN_NEAR_POSITIONS',
    CLICK_POSITION: 'CLICK_POSITION',
    MARK_POSITION: 'MARK_POSITION',
    END_BATTLE: 'END_BATTLE',
    // OPEN_ALL_FIELD : 'OPEN_ALL_FIELD',
    // WIN_BATTLE : 'WIN_BATTLE',
    // LOSE_BATTLE : 'LOSE_BATTLE',
    // CHECK_OPENED_POSITIONS : 'CHECK_OPENED_POSITIONS',
    // CHECK_MARKED_POSITIONS : 'CHECK_MARKED_POSITIONS',
};
import { IBattle } from '../IBattle';
import { IFieldConfig } from '../IField';
import { IPositionArgs } from '../IPosition';

const startBattle = (fieldConfig: IFieldConfig) => {
    return {
        type: actions.START_BATTLE,
        fieldConfig: fieldConfig || { bombs: 9, height: 9, width: 9 }
    };
};

const openNearPositions = (battle: IBattle, position: IPositionArgs) => {
    return {
        type: actions.OPEN_NEAR_POSITIONS,
        battle
    };
};

const clickPosition = (battle: IBattle, position: IPositionArgs, autoOpen?: boolean) => {
    return {
        type: actions.CLICK_POSITION,
        battle
    };
};

const markPosition = (battle: IBattle, position: IPositionArgs) => {
    return {
        type: actions.START_BATTLE,
        battle
    };
};

const endBattle = (battle: IBattle, win: boolean) => {
    return {
        type: actions.START_BATTLE,
        battle
    };
};

export {
    actions,
    startBattle,
    clickPosition,
    markPosition,
    endBattle,
    openNearPositions
};
