import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCharacterSpells(action) {
  try {
    const characterSpellsList = yield axios.get(`/api/characterCollection/spells/${action.payload}`)
    
    yield put({
      type: 'SET_CHARACTER_SPELLS_LIST',
      payload: characterSpellsList.data
    })
  } catch (error) {
    console.log('error fetching character spells', error)
  }
}

function* removeSpell(action) {
  try {
    yield axios.delete(`/api/characterCollection/spell/remove/${action.payload.spellId}?characterId=${action.payload.characterId}`);

    yield put({
      type: 'FETCH_CHARACTER_SPELLS',
      payload: action.payload.characterId
    })
  } catch (error) {
    console.log('error removing spell', error)
  }
}

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
  yield takeLatest('SAVE_SPELLS', saveSpells);

  yield takeLatest('FETCH_CHARACTER_SPELLS', fetchCharacterSpells);

  yield takeLatest('REMOVE_SPELL', removeSpell)
} // end spellsSaga

export default spellsSaga;