import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* generateRandomCharacter(action) {
  try {
    // get class info pertaining to user parameters for user review
    const randomCharacter = yield axios.get(
      `/api/characterCreator/generate?playStyle=${action.payload.playStyle}&magicStyle=${action.payload.magicStyle}`
    );

    // save it in redux state for user to review
    yield put({ 
      type: 'SET_GENERATED_CHARACTER', 
      payload: {
        ...randomCharacter.data, 
        character_name: action.payload.character_name, 
        gender: action.payload.gender
      } 
    });
  } catch (error) {
    console.log('Error with character generator:', error);
  }
} // en generateRandomCharacter

function* saveGeneratedCharacter(action) {
  try {
    yield axios.post('/api/characterCreator/', action.payload);
    
    yield put({
      type: 'FETCH_CHARACTERS',
      payload: 'FALSE'
    })
  } catch (error) {
    console.log('Error saving generated character:', error);
  }
}

function* characterCreationSaga() {
  yield takeLatest('GET_RANDOM_CHARACTER', generateRandomCharacter);

  yield takeLatest('SAVE_GENERATED_CHARACTER', saveGeneratedCharacter);
} // end characterCreationSaga

export default characterCreationSaga;