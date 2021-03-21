// 'SET_CHARACTER_LIST'

const charactersList = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHARACTER_LIST':
      return action.payload;
    default:
      return state;
  }
} // end charactersList reducer

export default charactersList;