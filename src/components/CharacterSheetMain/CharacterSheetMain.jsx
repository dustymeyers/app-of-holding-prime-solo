import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Material-UI Components
import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  TextField
} from '@material-ui/core';
import { AccessAlarm, EditIcon, ThreeDRotation } from '@material-ui/icons';

function CharacterSheetMain({ skillsAndSavingThrows}) {
  console.log('in CharacterSheetMain, character is:', character);
  console.log('skills and saving throws', skillsAndSavingThrows);
  const character = useSelector(store => store.characters.characterDetails);
  const dispatch = useDispatch();
  const paramsObject = useParams();

  const baseStrength = character.baseInformation.str_score;
  const baseDexterity = character.baseInformation.dex_score;
  const baseConstitution = character.baseInformation.con_score;
  const baseIntelligence = character.baseInformation.int_score;
  const baseWisdom = character.baseInformation.wis_score;
  const baseCharisma = character.baseInformation.cha_score;
  const proficiencyBonus = Math.ceil((character.baseInformation.level)/4) + 1;

  let characterState;

  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTER_SHEET_COMPONENTS'
    });
    dispatch({
      type:'FETCH_CHARACTER',
      payload: paramsObject.id
    });
    // setEditCharacter(character.baseInformation);
  }, []);
  
 
  if (character.baseInformation.max_hit_points) {
    console.log('its really really true')
    characterState = character.baseInformation;
  } else {
    characterState = {
      armor_class: 0,
      current_hit_points: 0,
      max_hit_points: 0,
      temporary_hit_points: 0
    }
  }

  const [editCharacter, setEditCharacter] = useState(characterState);
  const [editMax, setEditMax] = useState(character.baseInformation.max_hit_points);
  
  console.log('editMax is', editMax);

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
        <form>
          <TextField
            value={editMax}
            label="Max Hit Points"
            /*value={editCharacter.current_hit_points}*/
            onChange={event => setEditMax(event.target.value)}

          ></TextField>
          {/* <TextField
            value={editCharacter}
          ></TextField> */}
          <TextField
            /*value={editCharacter.current_hit_points}*/
          ></TextField>
        </form>
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
          {skillsAndSavingThrows.skillsList.map(skill => {
            // console.log('skill.id', skill.id);
            for (let proficiency of character.skillProficiencies){
              // console.log('proficiency.id', proficiency.id);
              if (proficiency.id === skill.id) {
                // console.log('id is equal')
                return <li key={skill.id}>{skill.skill_name} Proficient</li>;
              } else {
                // console.log('id not equal')
                return <li key={skill.id}>{skill.skill_name}</li>;
              }
            }
          })}
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