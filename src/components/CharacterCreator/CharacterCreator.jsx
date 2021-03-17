import CharacterCreatorInput from '../CharacterCreatorInput/CharacterCreatorInput';
import CharacterCreatorReview from '../CharacterCreatorReview/CharacterCreatorReview';

import {
  ButtonGroup,
  Button,
  Grid,
  Paper,

} from '@material-ui/core';

function CharacterCreator() {
  return(
    <Grid container component={Paper} spacing={3}>
      <Grid item>
        <h2>This is where the character creator will go.</h2>
      </Grid>
      <Grid item>
        <CharacterCreatorInput />
      </Grid>
      <Grid item>
        <CharacterCreatorReview />
      </Grid>
    </Grid>
  );
}// end CharacterCreator

export default CharacterCreator;