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
      type:'FETCH_GENERATED_CHARACTER'
    })
  }, []);

  return(
    <Grid container spacing={3}>

          <Grid item>
            <h2>Character Review</h2>
          </Grid>

          <Grid item>
            <h3>Ability Scores:</h3>
            <p>Strength: {randomCharacter.str_score}</p>
            <p>Dexterity: {randomCharacter.dex_score}</p>
            <p>Constitution: {randomCharacter.con_score}</p>
            <p>Intelligence: {randomCharacter.int_score}</p>
            <p>Wisdom: {randomCharacter.wis_score}</p>
            <p>Charisma: {randomCharacter.cha_score}</p>
          </Grid>

          <Grid item>
            <h3>Character Name: {randomCharacter.character_name}</h3>
            <p>Gender: {randomCharacter.gender}</p>
            <p>Level 1</p>
          </Grid>

          <Grid item>
            <h3>Base Health and AC</h3>
            <p>Starting Health: {randomCharacter.classInfo.hit_die + Math.floor((randomCharacter.con_score - 10 ) / 2)}</p>
            <p>Base AC: {Math.floor((randomCharacter.dex_score - 10 ) / 2) + 10}</p>
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
    </Grid>
  )
} // end CharacterCreatorReview 

export default CharacterCreatorReview;