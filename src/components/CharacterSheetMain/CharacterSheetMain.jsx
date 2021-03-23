import {
  Grid,
} from '@material-ui/core';

function CharacterSheetMain({character}) {
  console.log('in CharacterSheetMain, character is:', character);

  const baseStrength = character.baseInformation.str_score;
  const baseDexterity = character.baseInformation.dex_score;
  const baseConstitution = character.baseInformation.con_score;
  const baseIntelligence = character.baseInformation.int_score;
  const baseWisdom = character.baseInformation.wis_score;
  const baseCharisma = character.baseInformation.cha_score;
  const proficiencyBonus = Math.ceil((character.baseInformation.level)/4) + 1;

  const abilityScoreModifier = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
  }

  return(
    <Grid container>
      <Grid item>
        <h2>Character</h2>
        <p>Name: {character.baseInformation.character_name}</p>
        <p>Class and Level: Level {character.baseInformation.level} {character.baseInformation.class_name}</p>
        <p>Background: {character.baseInformation.background}</p>
        <p>Race: {character.baseInformation.race_name}</p>
        <p>Gender: {character.baseInformation.gender}</p>
        <p>Alignment: {character.baseInformation.alignment}</p>
        <p>Experience Points: {character.baseInformation.experience_points}</p>
        <p>{JSON.stringify(character.baseInformation)}</p>
      </Grid>

      <Grid item>
        <h2>Ability Scores:</h2>
        <p>Strength: {baseStrength + character.baseInformation.str_bonus}, Modifier: {abilityScoreModifier(baseStrength)}</p>
        <p>Dexterity: {baseDexterity + character.baseInformation.dex_bonus}, Modifier: {abilityScoreModifier(baseDexterity)}</p>
        <p>Constitution: {baseConstitution + character.baseInformation.con_bonus}, Modifier: {abilityScoreModifier(baseConstitution)}</p>
        <p>Intelligence: {baseIntelligence + character.baseInformation.int_bonus}, Modifier: {abilityScoreModifier(baseIntelligence)}</p>
        <p>Wisdom: {baseWisdom + character.baseInformation.wis_bonus}, Modifier: {abilityScoreModifier(baseWisdom)}</p>
        <p>Charisma: {baseCharisma + character.baseInformation.cha_bonus}, Modifier: {abilityScoreModifier(baseCharisma)}</p>
      </Grid>

      <Grid item>
        <h2>AC: {character.baseInformation.armor_class}</h2>
        <h3>Current Health Points: {character.baseInformation.current_hit_points}</h3>
        <h3>Max Health Points: {character.baseInformation.max_hit_points}</h3>
        <h3>Temporary Health Points: {character.baseInformation.temporary_hit_points}</h3>
      </Grid>

      <Grid item>
        <h2>Hit Die: 1d{character.baseInformation.hit_die}</h2>
        <h3>Hit Dice Available: {character.baseInformation.hit_dice_available}</h3>
        <h3>Maximum Number of Hit Dice: {character.baseInformation.level}</h3>
      </Grid>

      <Grid item>
        <h2>Proficiency Bonus: +{proficiencyBonus}</h2>
        <h3>Passive Perception: <strong>TODO</strong></h3>
      </Grid>

      <Grid item>
        <h2>Skills:</h2>
      </Grid>

      <Grid item>
        <h2>Features: </h2>
        <ul>
          {character.features.map((feature, index) => {
            return(
              <li key={index}>
                <strong>{feature.feature_name}</strong>: {feature.feature_description}
              </li>
            );
          })}
        </ul>
        <p>{JSON.stringify(character.features)}</p>
      </Grid>

      <Grid item>
        <h2>Skill Proficiencies</h2>
        <ul>
          <li></li>
        </ul>
        <p>{JSON.stringify(character.skillProficiencies)}</p>
      </Grid>

      <Grid item>
        <h2>Saving Throw Proficiencies</h2>
        <p>{JSON.stringify(character.savingThrowProficiencies)}</p>
      </Grid>

      <Grid item>
        <h2>Languages Known</h2>
        <p>{JSON.stringify(character.languagesKnown)}</p>
      </Grid>
    </Grid>
  );
}// end CharacterSheetMain

export default CharacterSheetMain;