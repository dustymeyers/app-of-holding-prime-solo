import { combineReducers } from 'redux';

const skillsAndSavingThrowsList = (state = { skillsList: [], savingThrowsList: [] }, action) => {
  switch (action.type) {
    case 'SET_SKILLS_AND_SAVING_THROWS_LISTS':
      return action.payload;
    default:
      return state;
  }
} // end skillsAndSavingThrowsList

export default skillsAndSavingThrowsList;