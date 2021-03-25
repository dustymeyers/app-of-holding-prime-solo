import { combineReducers } from 'redux';

// stores info for single character
const characterDetails = (state = {
  baseInformation: {
    alignment: '',
    armor_class: 0,
    cha_score: 0,
    character_name: '',
    con_score: 0,
    current_hit_points: 0,
    dex_score: 0,
    experience_points: 0,
    gender: '',
    int_score: 0,
    level: 0,
    max_hit_points: 0,
    str_score: 0,
    temporary_hit_points: 0,
    wis_score: 0,
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