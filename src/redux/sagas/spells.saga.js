import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* saveSpells(action) {
  try {
    console.log('adding spell for character', action.payload.characterId);
    console.log('Adding spells', action.payload.spells);
    yield axios.post(`/api/characterCollection/spells/${action.payload.characterId}`, action.payload.spells)

    yield put({
      type: 'FETCH_CHARACTER_SPELLS',
      payload: action.payload.characterId
    })
  } catch (error) {
    console.log('error saving spells', error);
  }
}

function* spellsSaga() {
  yield takeLatest('SAVE_SPELLS', saveSpells)

} // end spellsSaga

export default spellsSaga;