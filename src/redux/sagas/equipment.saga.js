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

function* removeEquipment(action) {
  try {
    console.log('in removeEquipment', action.payload);
    yield axios.delete(`/api/characterCollection/equipment/remove/${action.payload.equipmentId}?characterId=${action.payload.characterId}`)

    yield put({
      type: 'FETCH_CHARACTER_EQUIPMENT',
      payload: action.payload.characterId
    })
  } catch (error) {
    console.log('error removing item', error)
  }
}

function* saveItems(action) {
  try {
    console.log('adding item for character', action.payload.characterId);
    console.log('Adding items', action.payload.items);

    yield axios.post(`/api/characterCollection/equipment/${action.payload.characterId}`, action.payload.items);

    yield put({
      type: 'FETCH_CHARACTER_EQUIPMENT',
      payload: action.payload.characterId
    })

    console.log('item added');
    yield put({
      type: 'CLEAR_ITEMS_TO_ADD'
    });
    // todo add
  } catch (error) {
    console.log('error saving items', error);
  }
} // end saveItems

function* updateEquipmentQty(action) {
  try {
    yield axios.put('/api/characterCollection/equipment/updateQty', action.payload);

    yield put({
      type: 'FETCH_CHARACTER_EQUIPMENT',
      payload: action.payload.characterId
    });
  } catch (error) {

  }
}

function* equipmentSaga() {
  yield takeLatest('SAVE_ITEMS', saveItems);

  yield takeLatest('FETCH_CHARACTER_EQUIPMENT', fetchCharacterEquipment);

  yield takeLatest('REMOVE_EQUIPMENT', removeEquipment)

  yield takeLatest('UPDATE_EQUIPMENT_QTY', updateEquipmentQty)
} // end equipmentSaga

export default equipmentSaga;