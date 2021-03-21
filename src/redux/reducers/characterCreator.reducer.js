import { combineReducers } from 'redux';

// used to store our randomly generated character for the user to review
// aspects of this stored state will be used to save the character to the db
const characterCreatorReducer = (
  state = {
    classInfo: { class_features: [] },
    classSkills: [],
    raceFeatures: [],
    raceInfo: {},
    raceSkills: []
  }, 
  action) => {
  switch (action.type) {
    case 'SET_GENERATED_CHARACTER':
      return action.payload;
    default:
      return state;
  }
}

export default characterCreatorReducer;