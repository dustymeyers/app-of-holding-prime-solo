import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCharacters(action) {
  try {
    const characterList = yield axios.get(`/api/characterCollection/?dead=${action.payload}`);

    yield put({
      type: 'SET_CHARACTER_LIST',
      payload: characterList.data
    })
  } catch (error) {
    console.log('Error fetching user characters list', error);
  }
} // end fetchCharacters

function* charactersSaga() {
  yield takeLatest('FETCH_CHARACTERS', fetchCharacters);
} // end charactersSaga

export default charactersSaga;