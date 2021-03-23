import { combineReducers } from 'redux';

// stores info for single character
const characterDetails = (state = {
  baseInformation: {},
  features: [],
  skillProficiencies: [],
  savingThrowProficiencies: [],
  languagesKnown: []
}, action) => {
  switch (action.type) {
    case 'SET_CHARACTER_DETAILS':
      return action.payload;
    default:
      return state;
  }
} // end characterDetails reducer

// stores list of all user characters
const charactersList = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHARACTER_LIST':
      return action.payload;
    default:
      return state;
  }
} // end charactersList reducer


export default combineReducers({
  characterDetails,
  charactersList,
});