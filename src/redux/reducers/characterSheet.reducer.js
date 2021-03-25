import { combineReducers } from 'redux';

const equipmentInformation = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EQUIPMENT_INFORMATION':
      return action.payload;
    default:
      return state;
  }
} // end equipmentInformation

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
  equipmentInformation
});