import { useSelector } from 'react-redux';

import {
  ButtonGroup,
  Button,
  Grid,
} from '@material-ui/core';

function CharacterCreatorReview() {
  const randomCharacter = useSelector(store => store.characterCreatorReducer);
  console.log('randomCharacter', randomCharacter);

  return(
    <Grid container spacing={3}>
          <Grid item>
            <h3>Ability Scores: </h3>
            <p>Strength: {randomCharacter.str_score}</p>
            <p>Dexterity: {randomCharacter.dex_score}</p>
            <p>Constitution: {randomCharacter.con_score}</p>
            <p>Intelligence: {randomCharacter.int_score}</p>
            <p>Wisdom: {randomCharacter.wis_score}</p>
            <p>Charisma: {randomCharacter.cha_score}</p>
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
         
          </Grid>

          <Grid item>
            <h3>Race</h3>
            <h4>Racial features, ability score bonus, languages</h4>
            <p>{JSON.stringify(randomCharacter.raceInfo)}</p>
          </Grid>
    </Grid>
  )
} // end CharacterCreatorReview 

export default CharacterCreatorReview;