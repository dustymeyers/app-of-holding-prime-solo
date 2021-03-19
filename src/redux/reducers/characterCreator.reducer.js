import { combineReducers } from 'redux';

const characterCreatorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GENERATED_CHARACTER':
      return action.payload;
    default:
      return state;
  }
}

export default characterCreatorReducer;