import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* saveItems(action) {
  try {
    console.log('adding item for character', action.payload.characterId);
    console.log('Adding items', action.payload.items);
    
    yield axios.post(`/api/characterCollection/equipment/${action.payload.characterId}`, action.payload.items);

    console.log('item added');
    // todo add
  } catch (error) {
    console.log('error saving items', error);
  }
} // end saveItems

function* equipmentSaga() {
  yield takeLatest('SAVE_ITEMS', saveItems);
} // end equipmentSaga

export default equipmentSaga;