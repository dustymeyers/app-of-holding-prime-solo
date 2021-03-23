// 'FETCH_CHARACTER_SHEET_COMPONENTS'
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCharacterToEdit(action) {
  try {
    const character = yield axios.get(`/api/editCharacter/information/${action.payload}`);

    yield put({
      type: 'SET_CHARACTER_TO_EDIT',
      payload: character.data
    });
  } catch (error) {
    console.log('Error fetching character to edit.', error);
  }
} // end fetchCharacterSheetComponents

function* editCharacterSaga() {
  yield takeLatest('FETCH_CHARACTER_TO_EDIT', fetchCharacterToEdit);
} // end characterSheetSaga

export default editCharacterSaga;