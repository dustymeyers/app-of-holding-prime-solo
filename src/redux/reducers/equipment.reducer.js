import { combineReducers } from 'redux';

const characterEquipmentList = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHARACTER_EQUIPMENT_LIST':
      return action.payload;
    default:
      return state;
  }
}

const equipmentToAddList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEMS_TO_ADD':
      return [...state, action.payload];
    case 'CLEAR_ITEMS_TO_ADD':
      return [];
    default:
      return state;
  }
} // end equipmentList

export default combineReducers({
  equipmentToAddList,
  characterEquipmentList
});