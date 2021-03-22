import {
  Grid,
} from '@material-ui/core';

function CharacterSheetMain({character}) {
  console.log('in CharacterSheetMain, character is:', character);
  return(
    <Grid container>
      <Grid item>
        <h2>Base Information</h2>
        <p>{JSON.stringify(character.baseInformation)}</p>

        <h2>Features</h2>
        <p>{JSON.stringify(character.features)}</p>

        <h2>Skill Proficiencies</h2>
        <p>{JSON.stringify(character.skillProficiencies)}</p>

        <h2>Saving Throw Proficiencies</h2>
        <p>{JSON.stringify(character.savingThrowProficiencies)}</p>

        <h2>Languages Known</h2>
        <p>{JSON.stringify(character.languagesKnown)}</p>
      </Grid>
    </Grid>
  );
}// end CharacterSheetMain

export default CharacterSheetMain;