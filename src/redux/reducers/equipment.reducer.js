import { combineReducers } from 'redux';

const equipmentToAddList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEMS_TO_ADD':
      return [...state, action.payload];
    default:
      return state;
  }
} // end equipmentList

export default combineReducers({
  equipmentToAddList
});