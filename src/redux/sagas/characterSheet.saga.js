// 'FETCH_CHARACTER_SHEET_COMPONENTS'
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllEquipment() {
  try {
    const equipmentList = yield axios.get('/api/characterSheet/equipment');

    yield put({
      type: 'SET_EQUIPMENT_LIST',
      payload: equipmentList.data
    })
  } catch (error) {
    console.log('Error fetching entire equipment list', error);
  }
}

function* fetchAllSpells() {
  try {
    const spellsList = yield axios.get('/api/characterSheet/spells');

    yield put({
      type: 'SET_SPELLS_LIST',
      payload: spellsList.data
    })
  } catch (error) {
    console.log('Error fetching entire spells list', error);
  }
}

function* fetchCharacterSheetComponents() {
  try {
    const skillsAndSavingThrowsList = yield axios.get('/api/characterSheet/main');

    yield put({
      type: 'SET_SKILLS_AND_SAVING_THROWS_LISTS',
      payload: skillsAndSavingThrowsList.data
    });
  } catch (error) {
    console.log('Error fetching skills list and saving throws list.', error);
  }
} // end fetchCharacterSheetComponents

function* fetchEquipmentInfo(action) {
  try {
    const equipmentInfo = yield axios.get(`/api/characterSheet/equipment/information?api_index=${action.payload}`);

    yield put({
      type: 'SET_EQUIPMENT_INFORMATION',
      payload: equipmentInfo.data
    })

  } catch (error) {
    console.log('Error fetching equipment information from https://www.dnd5eapi.co', error)
  }
}

function* fetchSpellInfo(action) {
  try{
    const spellInfo = yield axios.get(`/api/characterSheet/spell/information?api_index=${action.payload}`);

    yield put({
      type: 'SET_SPELL_INFORMATION',
      payload: spellInfo.data
    })    
  } catch (error) {
    console.log('Error fetching spell information from https://www.dnd5eapi.co', error)
  }
}

function* characterSheetSaga() {
  yield takeLatest('FETCH_CHARACTER_SHEET_COMPONENTS', fetchCharacterSheetComponents);

  yield takeLatest('FETCH_ALL_EQUIPMENT', fetchAllEquipment);

  yield takeLatest('FETCH_EQUIPMENT_INFO', fetchEquipmentInfo);

  yield takeLatest('FETCH_ALL_SPELLS', fetchAllSpells);

  yield takeLatest('FETCH_SPELL_INFO', fetchSpellInfo);
} // end characterSheetSaga

export default characterSheetSaga;