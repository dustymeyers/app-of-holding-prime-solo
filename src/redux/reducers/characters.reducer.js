import { combineReducers } from 'redux';

// stores info for single character
const characterDetails = (state = {
  baseInformation: {
    alignment: '',
    armor_class: 0,
    character_name: '',
    current_hit_points: 0,
    gender: '',
    level: 1,
    max_hit_points: 0,
    temporary_hit_points: 0,
    experience_points: 0
  },
  features: [],
  skillProficiencies: [],
  savingThrowProficiencies: [],
  languagesKnown: []
}, action) => {
  switch (action.type) {
    case 'SET_CHARACTER_DETAILS':
      return action.payload;
    case 'UPDATE_CHARACTER':
      return {
        ...state, 
        ...action.payload
      };
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