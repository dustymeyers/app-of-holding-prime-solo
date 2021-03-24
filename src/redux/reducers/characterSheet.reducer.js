import { combineReducers } from 'redux';

const equipmentList = (state = [], action) => {
  switch (action.type) {
    case 'SET_EQUIPMENT_LIST':
      return action.payload;
    default:
      return state;
  }
} // end equipmentList

const skillsAndSavingThrowsList = (state = { skillsList: [], savingThrowsList: [] }, action) => {
  switch (action.type) {
    case 'SET_SKILLS_AND_SAVING_THROWS_LISTS':
      return action.payload;
    default:
      return state;
  }
} // end skillsAndSavingThrowsList

export default combineReducers({
  skillsAndSavingThrowsList,
  equipmentList,
});