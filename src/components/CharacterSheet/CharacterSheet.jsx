import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Character Sheet Components
import CharacterSheetEquipment from '../CharacterSheetEquipment/CharacterSheetEquipment';
import CharacterSheetMain from '../CharacterSheetMain/CharacterSheetMain';
import CharacterSheetSpells from '../CharacterSheetSpells/CharacterSheetSpells';

// Material-UI components
import { 
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
} from '@material-ui/core';

function CharacterSheet() {
  const dispatch = useDispatch();
  const history = useHistory();
  const paramsObject = useParams();

  const [currentView, setCurrentView] = useState({
    main: true,
    equipment: false,
    spells: false,
  });
  // const character = useSelector(store => store.characters.characterDetails);
  // const skillsAndSavingThrows = useSelector(store => store.characterSheetComponents);
  
  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTER_SHEET_COMPONENTS'
    });
    dispatch({
      type: 'FETCH_CHARACTER',
      payload: paramsObject.id
    });
    dispatch({
      type: 'FETCH_CHARACTER_EQUIPMENT',
      payload: paramsObject.id
    });
    dispatch({
      type: 'FETCH_CHARACTER_SPELLS',
      payload: paramsObject.id
    })
    dispatch({
      type: 'FETCH_ALL_EQUIPMENT'
    });
    dispatch({
      type: 'FETCH_ALL_SPELLS'
    });
  }, []);



  return(
    
      <Grid container component={Paper} direction="column" spacing={4}>
        <Grid item xs={12}>          
          <ButtonGroup>
            <Button onClick={() => setCurrentView({
              main: true,
              equipment: false,
              spells: false,
            })}>
              Main
            </Button>
            <Button onClick={() => setCurrentView({
              main: false,
              equipment: true,
              spells: false,
            })}>
              Equipment
            </Button>
            <Button onClick={() => setCurrentView({
              main: false,
              equipment: false,
              spells: true,
            })}>
              Spells
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <Box p={4}>
            {currentView.main ? <CharacterSheetMain/> : <></>}
            {currentView.equipment ? <CharacterSheetEquipment /> : <></>}
            {currentView.spells ? <CharacterSheetSpells /> : <></>}
          </Box>
        </Grid>
      </Grid>
  );
}// end CharacterSheet

export default CharacterSheet;