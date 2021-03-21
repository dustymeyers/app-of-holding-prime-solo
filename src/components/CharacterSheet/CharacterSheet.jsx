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


  return(
    <>
      <Grid container component={Paper}>
        <Grid item>
          <h2>This is where the CharacterSheet will go.</h2>
          <CharacterSheetMain />
          <CharacterSheetEquipment />
          <CharacterSheetSpells />
        </Grid>
      </Grid>
    </>
  );
}// end CharacterSheet

export default CharacterSheet;