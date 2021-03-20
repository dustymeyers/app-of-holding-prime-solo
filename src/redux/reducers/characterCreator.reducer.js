import { combineReducers } from 'redux';

const characterCreatorReducer = (state = {
  cha_score: 0,
  character_name: '',
  classInfo: { class_features: [] },
  classSkills: [],
  con_score: 0,
  dex_score: 0,
  gender: '',
  int_score: 0,
  raceFeatures: [],
  raceInfo: {},
  raceSkills: [],
  str_score: 0,
  wis_score: 0
}, action) => {
  switch (action.type) {
    case 'SET_GENERATED_CHARACTER':
      return action.payload;
      // TODO - FIX FETCH
    case 'FETCH_GENERATED_CHARACTER':
      return {...state};
    default:
      return state;
  }
}

export default characterCreatorReducer;