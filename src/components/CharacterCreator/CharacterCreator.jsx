import { useState } from 'react';

import CharacterCreatorInput from '../CharacterCreatorInput/CharacterCreatorInput';
import CharacterCreatorReview from '../CharacterCreatorReview/CharacterCreatorReview';

import {
  ButtonGroup,
  Button,
  Grid,
  Paper,

} from '@material-ui/core';

function CharacterCreator() {
  const [readyForReview, setReadyForReview] = useState(false);

  return(
    <Grid container component={Paper} spacing={3}>
      <Grid item>
        <h2>This is where the character creator will go.</h2>
      </Grid>
      <Grid item>
        <CharacterCreatorInput
          readyForReview={readyForReview}
          setReadyForReview={setReadyForReview}
        />
      </Grid>
      <Grid item>
        <CharacterCreatorReview
          readyForReview={readyForReview}
          setReadyForReview={setReadyForReview}
        />
      </Grid>
    </Grid>
  );
}// end CharacterCreator

export default CharacterCreator;