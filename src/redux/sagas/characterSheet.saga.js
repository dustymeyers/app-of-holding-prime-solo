// 'FETCH_CHARACTER_SHEET_COMPONENTS'
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCharacterSheetComponents() {
  try {
    const skillsAndSavingThrowsList = yield axios.get('/api/characterSheet');

    yield put({
      type: 'SET_SKILLS_AND_SAVING_THROWS_LISTS',
      payload: skillsAndSavingThrowsList.data
    });
  } catch (error) {
    console.log('Error fetching skills list and saving throws list.', error);
  }
} // end fetchCharacterSheetComponents

function* characterSheetSaga() {
  yield takeLatest('FETCH_CHARACTER_SHEET_COMPONENTS', fetchCharacterSheetComponents)
} // end characterSheetSaga

export default characterSheetSaga;