import { combineReducers } from 'redux';


const editCharacter = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHARACTER_TO_EDIT':
      return action.payload;
    default:
      return state;
  }
}

export default editCharacter;