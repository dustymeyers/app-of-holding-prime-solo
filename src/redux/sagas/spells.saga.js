import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* saveSpells(action) {
  try {
    console.log('adding spell for character', action.payload.characterId);
    console.log('Adding spells', action.payload.spells);

  } catch (error) {
    console.log('error saving spells', error);
  }
}

function* spellsSaga() {
  yield takeLatest('SAVE_SPELLS', saveSpells)

} // end spellsSaga

export default spellsSaga;