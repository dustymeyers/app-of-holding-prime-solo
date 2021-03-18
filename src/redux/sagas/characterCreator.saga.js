import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* generateRandomCharacter(action) {
  try {
    // get class info pertaining to user parameters for user review
    const randomCharacter = yield axios.get(
      `/api/characterCreator/generate?playStyle=${action.payload.playStyle}&magicStyle=${action.payload.magicStyle}`
    );

    // save it in redux state for user to review
    yield put({ type: 'SET_GENERATED_CHARACTER', payload: randomCharacter.data})
  } catch (error) {
    console.log('Error with character generator:', error);
  }
} // en generateRandomCharacter

function* characterCreationSaga() {
  yield takeLatest('GET_RANDOM_CHARACTER', generateRandomCharacter);
} // end characterCreationSaga

export default characterCreationSaga;