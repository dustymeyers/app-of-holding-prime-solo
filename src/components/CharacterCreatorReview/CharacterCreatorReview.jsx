import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import {
  ButtonGroup,
  Button,
  Grid,
} from '@material-ui/core';

function CharacterCreatorReview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const randomCharacter = useSelector(store => store.characterCreatorReducer);

  // these will be used as our payload for user saved character information.
  const characterGender = randomCharacter.gender;
  const characterName = randomCharacter.character_name;
  const characterStrength = randomCharacter.str_score;
  const characterDexterity = randomCharacter.dex_score;
  const characterConstitution = randomCharacter.con_score;
  const characterIntelligence = randomCharacter.int_score;
  const characterWisdom = randomCharacter.wis_score;
  const characterCharisma = randomCharacter.cha_score;
  const classId = randomCharacter.classInfo.id;
  const raceId = randomCharacter.raceInfo.id;

  // Base Armor Class is calculated by the dexterity modifier + 10 (unarmored)
  // All ability score modifiers = (ability score - 10) / 2
  const baseArmorClass = Math.floor((characterDexterity - 10 ) / 2) + 10;

  // Maximum Hit Points for level one  is calculated by the constitution modifier + max roll for that class's hit die
  const maxHitPoints = randomCharacter.classInfo.hit_die + Math.floor((randomCharacter.con_score - 10 ) / 2);

  console.log('classId', classId);
  const saveCharacter = () => {
    console.log('save clicked');
    dispatch({
      type: 'SAVE_GENERATED_CHARACTER',
      payload: {
        characterName,
        characterStrength,
        characterDexterity,
        characterConstitution,
        characterIntelligence, 
        characterWisdom,
        characterCharisma,
        maxHitPoints,
        characterGender,
        classId,
        raceId
      }
    });
  }

  const cancelCharacterCreator = () => {
    history.push('/characterCreator');
  }

  return(
    <Grid container spacing={3}>
          <Grid item>
            <h2>Character Review</h2>
          </Grid>

          {/* Displays character's randomly generated ability scores */}
          <Grid item>
            <h3>Ability Scores:</h3>
            <p>Strength: {characterStrength}</p>
            <p>Dexterity: {characterDexterity}</p>
            <p>Constitution: {characterConstitution}</p>
            <p>Intelligence: {characterIntelligence}</p>
            <p>Wisdom: {characterWisdom}</p>
            <p>Charisma: {characterCharisma}</p>
          </Grid>

          {/* Displays user chosen name/gender */}
          <Grid item>
            <h3>Character Name: {characterName}</h3>
            <p>Gender: {characterGender}</p>
            <p>Level 1</p>
          </Grid>

          {/* Displays character's calculated base armor class and level 1 hit points */}
          <Grid item>
            <h3>Base Health and AC</h3>
            <p>Starting Health: {maxHitPoints}</p>
            <p>Base Armor Class (unarmored): {baseArmorClass}</p>
          </Grid>

          {/* TO DO - BACKGROUND PERSONALITY STUFF */}
          <Grid item>
            <h3>Acolyte</h3>
            <h4>personality traits, ideals, bonds, flaws, starting equipment, background</h4>
          </Grid>

          {/* Skill proficiencies from race and class displayed here */}
          <Grid item>
            <h3>Skill Proficiencies</h3>
            <ul>
              {randomCharacter.classSkills.map(skill => {
                return(
                  <li key={skill.id}>{skill.skill_name}</li>
                )
              })}
              {randomCharacter.raceSkills.map(skill => {
                return(
                  <li key={skill.id}>{skill.skill_name}</li>
                )
              })}
            </ul>
          </Grid>

          {/* Displays randomly generated class information for user */}
          <Grid item>
            <h3>Class: {randomCharacter.classInfo.class_name}</h3>
            <ul>
              {randomCharacter.classInfo.class_features.map((feature, index) => {
                return(
                  <li key={index}><strong>{feature[0]}: </strong>{feature[1]}</li>
                );
              })}
            </ul>
            {randomCharacter.classInfo.spellcasting_ability !== 'None' ? 
              <h4>Spellcasting Ability: {randomCharacter.classInfo.spellcasting_ability}</h4> :
              <h4>This class doesn't cast spells.</h4>
            }
            <p>{JSON.stringify(randomCharacter.classInfo)}</p>            
          </Grid>

          {/* Displays randomly generated race information and bonuses attributed to said race */}
          <Grid item>
            <h3>Race: {randomCharacter.raceInfo.race_name}</h3>
            
            <h4>Ability Score Bonuses: </h4>

            <ul>
              <li><strong>Strength: </strong>+ {randomCharacter.raceInfo.str_bonus}</li>
              <li><strong>Dexterity: </strong>+ {randomCharacter.raceInfo.dex_bonus}</li>
              <li><strong>Constitution: </strong>+ {randomCharacter.raceInfo.con_bonus}</li>
              <li><strong>Intelligence: </strong>+ {randomCharacter.raceInfo.int_bonus}</li>
              <li><strong>Wisdom: </strong>+ {randomCharacter.raceInfo.wis_bonus}</li>
              <li><strong>Charisma: </strong>+ {randomCharacter.raceInfo.cha_bonus}</li>
            </ul>

            <h4>Speed: {randomCharacter.raceInfo.speed}</h4>

            <ul>
              {randomCharacter.raceInfo.race_name === 'Human' ? 
                <li>Humans don't have any other features</li> :
                randomCharacter.raceFeatures.map((feature, index) => {
                  return(
                    <li key={index}><strong>{feature[0]}: </strong>{feature[1]}</li>
                  );
              })}
            </ul>            
            <p>{JSON.stringify(randomCharacter.raceInfo)}</p>
          </Grid>

          <Grid item>
            <ButtonGroup variant="contained">
              <Button color="secondary" onClick={cancelCharacterCreator}>Cancel</Button>
              <Button color="primary" onClick={saveCharacter}>
                Save
              </Button>
            </ButtonGroup>
          </Grid>
    </Grid>
  )
} // end CharacterCreatorReview 

export default CharacterCreatorReview;