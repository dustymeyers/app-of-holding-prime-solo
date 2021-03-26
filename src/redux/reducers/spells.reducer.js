import { combineReducers } from 'redux';

const characterSpellsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHARACTER_SPELLS_LIST':
      return action.payload;
    default:
      return state;
  }
}

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
  characterSpellsList,
  spellsToAddList,
});