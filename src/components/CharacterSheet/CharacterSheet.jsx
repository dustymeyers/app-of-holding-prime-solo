import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// Character Sheet Components
import CharacterSheetEquipment from '../CharacterSheetEquipment/CharacterSheetEquipment';
import CharacterSheetMain from '../CharacterSheetMain/CharacterSheetMain';
import CharacterSheetSpells from '../CharacterSheetSpells/CharacterSheetSpells';

// Material-UI components
import { 
  Grid,
  Paper,
} from '@material-ui/core';

function CharacterSheet() {
  const dispatch = useDispatch();
  const history = useHistory();
  const paramsObject = useParams();
  const character = useSelector(store => store.characters.characterDetails);
  
  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTER_SHEET_COMPONENTS'
    })
    dispatch({
      type:'FETCH_CHARACTER',
      payload: paramsObject.id
    })
  }, []);



  return(
    <>
      <Grid container component={Paper}>
        <Grid item>
          <h2>This is where the CharacterSheet will go.</h2>
          <CharacterSheetMain character={character} />
          <CharacterSheetEquipment />
          <CharacterSheetSpells />
        </Grid>
      </Grid>
    </>
  );
}// end CharacterSheet

export default CharacterSheet;