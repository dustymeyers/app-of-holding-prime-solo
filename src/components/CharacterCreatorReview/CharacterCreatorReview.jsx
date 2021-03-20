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
  let spellCastingAbility;

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENERATED_CHARACTER'
    })
  }, []);

  const baseArmorClass = Math.floor((randomCharacter.dex_score - 10 ) / 2) + 10;
  const characterGender = randomCharacter.gender;
  const characterName = randomCharacter.character_name;
  const characterStrength = randomCharacter.str_score;
  const characterDexterity = randomCharacter.dex_score;
  const characterConstitution = randomCharacter.con_score;
  const characterIntelligence = randomCharacter.int_score;
  const characterWisdom = randomCharacter.wis_score;
  const characterCharisma = randomCharacter.cha_score;
  const classId = randomCharacter.classInfo.id;
  const maxHitPoints = randomCharacter.classInfo.hit_die + Math.floor((randomCharacter.con_score - 10 ) / 2);  
  const raceId = randomCharacter.raceInfo.id;

  const saveCharacter = () => {
    console.log('save clicked');
    dispatch({
      type: 'SAVE_GENERATED_CHARACTER',
      payload: {
        character_name: characterName,
        str_score: characterStrength,
        dex_score: characterDexterity,
        con_score: characterConstitution,
        int_score: characterIntelligence, 
        wis_score: characterWisdom,
        cha_score: characterCharisma,
        max_hit_points: maxHitPoints,
        gender: characterGender,
        class_id: classId,
        race_id: raceId
      }
    })
  }

  const cancelCharacterCreator = () => {
    history.push('/characterCreator')
  }

  return(
    <Grid container spacing={3}>

          <Grid item>
            <h2>Character Review</h2>
          </Grid>

          <Grid item>
            <h3>Ability Scores:</h3>
            <p>Strength: {characterStrength}</p>
            <p>Dexterity: {characterDexterity}</p>
            <p>Constitution: {characterConstitution}</p>
            <p>Intelligence: {characterIntelligence}</p>
            <p>Wisdom: {characterWisdom}</p>
            <p>Charisma: {characterCharisma}</p>
          </Grid>

          <Grid item>
            <h3>Character Name: {characterName}</h3>
            <p>Gender: {characterGender}</p>
            <p>Level 1</p>
          </Grid>

          <Grid item>
            <h3>Base Health and AC</h3>
            <p>Starting Health: {maxHitPoints}</p>
            <p>Base Armor Class(AC): {baseArmorClass}</p>
          </Grid>

          <Grid item>
            <h3>Acolyte</h3>
            <h4>personality traits, ideals, bonds, flaws, starting equipment, background</h4>
          </Grid>

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
            {/* <p>race name: {randomCharacter.race_features}</p> */}
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