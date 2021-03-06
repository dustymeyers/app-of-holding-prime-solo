import { combineReducers } from 'redux';

const equipmentInformation = (state = {
  cost: {
    quantity: 0,
    unit: ''
  },
  desc: [],
  equipment_category: {},
  name: '',
}, action) => {
  switch (action.type) {
    case 'SET_EQUIPMENT_INFORMATION':
      return action.payload;
    case 'CLEAR_EQUIPMENT_INFO':
      return {
        cost: {
          quantity: 0,
          unit: ''
        },
        desc: [],
        equipment_category: {},
        name: '',
      };
    default:
      return state;
  }
} // end equipmentInformation

const spellInformation = ( state = {
  components: [],
  desc: [],
  classes: [],
  higher_level: []
}, action) => {
  switch(action.type) {
    case 'SET_SPELL_INFORMATION':
      return action.payload;
    case 'CLEAR_SPELL_INFO':
      return state;
    default:
      return state;
  }
}

const equipmentList = (state = [], action) => {
  switch (action.type) {
    case 'SET_EQUIPMENT_LIST':
      return action.payload;
    default:
      return state;
  }
} // end equipmentList

const skillsAndSavingThrowsList = (state = { skillsList: [], savingThrowsList: [] }, action) => {
  switch (action.type) {
    case 'SET_SKILLS_AND_SAVING_THROWS_LISTS':
      return action.payload;
    default:
      return state;
  }
} // end skillsAndSavingThrowsList

// full spellsList from servers
const spellsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_SPELLS_LIST':
      return action.payload
    default:
      return state;
  }
}

export default combineReducers({
  skillsAndSavingThrowsList,
  equipmentList,
  equipmentInformation,
  spellInformation,
  spellsList
});