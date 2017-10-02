// import { battleMarkPosition, clickPosition, endBattle, openNearPositions, startBattle } from '../Battle';
import { actions, clickPosition, endBattle, markPosition, openNearPositions, startBattle } from './actions';
import store from './store';

import { IBattle } from '../IBattle';

const newBattle = (fieldConfig) => store.dispatch(startBattle(fieldConfig));

const click = (oldBattle, position) => store.dispatch(clickPosition(oldBattle, position));

const mark = (oldBattle, position) => store.dispach(markPosition(oldBattle, position));

const end = (oldBattle, position) => store.dispach(endBattle(oldBattle, false));

const openNear = (oldBattle, position) => store.dispach(openNearPositions(oldBattle, position));

const battle = (state: IBattle, action) => {
    switch (action.type) {
        case actions.START_BATTLE:
            return newBattle(state.field.fieldConfig);
        case actions.CLICK_POSITION:
            return click(state, action.index);
        case actions.OPEN_NEAR_POSITIONS:
            return openNear(state, action.index);
        case actions.MARK_POSITION:
            return mark(state, action.index);
        case actions.END_BATTLE:
            return end(state, action.index);
        default:
            return state || newBattle(state.field.fieldConfig);
    }
};
console.log(battle(null, null));
export {
    battle
};
