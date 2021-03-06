import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteCharacter(action) {
  try {
    yield axios.delete(`/api/characterCollection/delete/${action.payload}`);

    yield put({
      type: 'FETCH_CHARACTERS',
      payload: 'FALSE'
    })
  } catch (error) {
    console.log('Error deleting user character data', error);
  }
} // end deleteCharacter

// Sends axios get for specific user character
function* fetchCharacter(action) {
  try {
    console.log('fetch character with id:', action.payload);

    const character = yield axios.get(`/api/characterCollection/${action.payload}`);

    yield put({
      type: 'SET_CHARACTER_DETAILS',
      payload: character.data
    })
  } catch (error) {
    console.log('Error fetching user character data', error);
  }
} // end fetchCharacter

// Sends axios get for all user characters
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

function* updateCharacter(action) {
  try {
    console.log('updating character with:', action.payload.baseInformation)
    yield axios.put(`/api/characterCollection/edit/${action.payload.baseInformation.id}`, action.payload);

    yield put({
      type: 'FETCH_CHARACTER',
      payload: action.payload.baseInformation.id
    })

  } catch (error) {
    console.log('Error updating user character', error);
  }
}

function* charactersSaga() {
  yield takeLatest('FETCH_CHARACTERS', fetchCharacters);

  yield takeLatest('FETCH_CHARACTER', fetchCharacter);

  yield takeLatest('DELETE_CHARACTER', deleteCharacter);

  yield takeLatest('SAVE_CHARACTER_UPDATES', updateCharacter);
} // end charactersSaga

export default charactersSaga;