import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCharacterEquipment(action) {
  try {
    const characterEquipmentList = yield axios.get(`/api/characterCollection/equipment/${action.payload}`);

    yield put({
      type: 'SET_CHARACTER_EQUIPMENT_LIST',
      payload: characterEquipmentList.data
    });
  } catch (error) {
    console.log('error fetching character items', error)
  }
}

function* saveItems(action) {
  try {
    console.log('adding item for character', action.payload.characterId);
    console.log('Adding items', action.payload.items);

    yield axios.post(`/api/characterCollection/equipment/${action.payload.characterId}`, action.payload.items);

    console.log('item added');
    yield put({
      type: 'CLEAR_ITEMS_TO_ADD'
    });
    // todo add
  } catch (error) {
    console.log('error saving items', error);
  }
} // end saveItems

function* equipmentSaga() {
  yield takeLatest('SAVE_ITEMS', saveItems);

  yield takeLatest('FETCH_CHARACTER_EQUIPMENT', fetchCharacterEquipment);
} // end equipmentSaga

export default equipmentSaga;