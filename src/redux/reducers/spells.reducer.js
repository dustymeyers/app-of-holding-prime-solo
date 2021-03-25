import { combineReducers } from 'redux';

const spellsToAddList = (state = [], action) => {
  switch (action.type) {
    case 'SET_SPELLS_TO_ADD':
      return [...state, action.payload];
    case 'CLEAR_SPELLS_TO_ADD':
      return [];
    default:
      return state;
  }
} 

export default combineReducers({
  spellsToAddList,
});