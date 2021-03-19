import { useStore } from 'react-redux';

import {
  ButtonGroup,
  Button,
  Grid,
} from '@material-ui/core';

function CharacterCreatorReview() {
  const randomCharacter = useStore(store => store.randomCharacter);

  return(
    <Grid container spacing={3}>

      <Grid item>
        <h3>Raw Ability Scores</h3>
        
      </Grid>

      <Grid item>
        <h3>Character Name, Gender, level 1</h3>
      </Grid>

      <Grid item>
        <h3>Base Health, Base AC</h3>
      </Grid>

      <Grid item>
        <h3>background</h3>
        <h4>personality traits, ideals, bonds, flaws, starting equipment, background, skill proficiencies.</h4>
      </Grid>

      <Grid item>
        <h3>Class</h3>
        <h4>Class features, class skill proficiencies, spells</h4>
        <p>{JSON.stringify(randomCharacter.classInfo)}</p>
        {randomCharacter.classSkills}
      </Grid>

      <Grid item>
        <h3>Race</h3>
        <h4>Racial features, ability score bonus, languages</h4>
        {randomCharacter.raceInfo}
        {randomCharacter.raceSkills}
      </Grid>

    </Grid>
  )
} // end CharacterCreatorReview 

export default CharacterCreatorReview;