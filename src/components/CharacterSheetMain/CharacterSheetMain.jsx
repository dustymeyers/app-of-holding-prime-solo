import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Material-UI Components
import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  List,
  ListItem,
  TextField
} from '@material-ui/core';
import { AccessAlarm, EditIcon, ThreeDRotation } from '@material-ui/icons';

function CharacterSheetMain({ skillsAndSavingThrows}) {
  console.log('skills and saving throws', skillsAndSavingThrows);

  const character = useSelector(store => store.characters.characterDetails);
  // const editCharacter = useSelector(store => store.editCharacter);
  const dispatch = useDispatch();
  const paramsObject = useParams();

  const baseStrength = character.baseInformation.str_score;
  const baseDexterity = character.baseInformation.dex_score;
  const baseConstitution = character.baseInformation.con_score;
  const baseIntelligence = character.baseInformation.int_score;
  const baseWisdom = character.baseInformation.wis_score;
  const baseCharisma = character.baseInformation.cha_score;
  const proficiencyBonus = Math.ceil((character.baseInformation.level)/4) + 1;

  const [editMode, setEditMode] = useState({
    editAbilityScores: false,
    editBasicInfo: false,
    editHealth: false
  });


  // let characterState;

  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTER_SHEET_COMPONENTS'
    });
    dispatch({
      type: 'FETCH_CHARACTER',
      payload: paramsObject.id
    });

    // dispatch({
    //   type: 'FETCH_CHARACTER_TO_EDIT',
    //   payload: paramsObject.id
    // })
    // setEditCharacter(character.baseInformation);
  }, []);

  const abilityScoreModifier = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
  }

  const cancelEdit = () => {
    console.log('clicked cancel');
    setEditMode(false);
  }

  const saveEdit = () => {
    console.log('clicked save');
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: character
    });
    setEditMode(false);
  }

  const handleEdit = (key) => {
    setEditMode({ key: true});
  }

  console.log(editMode)

  return(
    <Grid container>

      {!editMode.editBasicInfo ?
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
          <Button variant="outlined" onClick={() => setEditMode({...editMode, editBasicInfo: true})}>Edit</Button>
        </Grid>
        :
        <Grid item>
          <TextField 
            label="Character Name"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  character_name: event.target.value
                }
              }
            })}
            type="text"
            value={character.baseInformation.character_name}
          />

          <TextField 
            label="Level"
            min="1"
            max="20"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  level: event.target.value
                }
              }
            })}
            type="number"
            value={character.baseInformation.level}
          />

          <TextField 
            label="Gender"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  gender: event.target.value
                }
              }
            })}
            type="text"
            value={character.baseInformation.gender}
          />

          <TextField 
            label="Alignment"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  alignment: event.target.value
                }
              }
            })}
            type="text"
            value={character.baseInformation.alignment}
          />

          <TextField
            label="Experience Points"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  experience_points: event.target.value
                }
              }
            })}
            type="number"
            value={character.baseInformation.experience_points}
          />

          <ButtonGroup variant="outlined">
            <Button 
              color="secondary" 
              onClick={() => {
                cancelEdit();
                setEditMode({...editMode, editBasicInfo: false});
              }}
            >
              Cancel
            </Button>
            <Button 
              color="primary" 
              onClick={() => {
              saveEdit();
              setEditMode({...editMode, editBasicInfo: false});
              }}
            >
              Save
            </Button>
          </ButtonGroup>
        </Grid>
      }
      {!editMode.editAbilityScores ?
        <Grid item>
          <h2>Ability Scores:</h2>
          <p>Strength: {baseStrength + character.baseInformation.str_bonus}, Modifier: {abilityScoreModifier(baseStrength)}</p>
          <p>Dexterity: {baseDexterity + character.baseInformation.dex_bonus}, Modifier: {abilityScoreModifier(baseDexterity)}</p>
          <p>Constitution: {baseConstitution + character.baseInformation.con_bonus}, Modifier: {abilityScoreModifier(baseConstitution)}</p>
          <p>Intelligence: {baseIntelligence + character.baseInformation.int_bonus}, Modifier: {abilityScoreModifier(baseIntelligence)}</p>
          <p>Wisdom: {baseWisdom + character.baseInformation.wis_bonus}, Modifier: {abilityScoreModifier(baseWisdom)}</p>
          <p>Charisma: {baseCharisma + character.baseInformation.cha_bonus}, Modifier: {abilityScoreModifier(baseCharisma)}</p>
          <Button variant="outlined" onClick={() => setEditMode({...editMode, editAbilityScores: true})}>Edit</Button>
        </Grid> :
        <Grid item>
          <TextField 
            label="Strength"
            min="3"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  str_score: event.target.value
                }
              }
            })}
            type="number"
            value={baseStrength}
          />

          <TextField 
            label="Dexterity"
            min="3"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  dex_score: event.target.value
                }
              }
            })}
            type="number"
            value={baseDexterity}
          />

          <TextField 
            label="Constitution"
            min="3"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  con_score: event.target.value
                }
              }
            })}
            type="number"
            value={baseConstitution}
          />

          <TextField 
            label="Intelligence"
            min="3"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  int_score: event.target.value
                }
              }
            })}
            type="number"
            value={baseIntelligence}
          />

          <TextField 
            label="Wisdom"
            min="3"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  wis_score: event.target.value
                }
              }
            })}
            type="number"
            value={baseWisdom}
          />  

          <TextField 
            label="Charisma"
            min="3"
            onChange={event => dispatch({
              type: 'UPDATE_CHARACTER',
              payload: {
                baseInformation: {
                  ...character.baseInformation,
                  cha_score: event.target.value
                }
              }
            })}
            type="number"
            value={baseCharisma}
          />

          <ButtonGroup variant="outlined">
            <Button 
              color="secondary" 
              onClick={() => {
                cancelEdit();
                setEditMode({...editMode, editAbilityScores: false});
              }}
            >
              Cancel
            </Button>
            <Button 
              color="primary" 
              onClick={() => {
              saveEdit();
              setEditMode({...editMode, editAbilityScores: false});
              }}
            >
              Save
            </Button>
          </ButtonGroup>
        </Grid>
      }


      {/* renders character health and armor class with edit button */}
      {!editMode.editHealth ? 
        // Text View !editMode.editHealth = true
        <Grid item>
          <h2>AC: {character.baseInformation.armor_class}</h2>
          <h3>Current Health Points: {character.baseInformation.current_hit_points}</h3>
          <h3>Max Health Points: {character.baseInformation.max_hit_points}</h3>
          <h3>Temporary Health Points: {character.baseInformation.temporary_hit_points}</h3>
          <Button variant="outlined" onClick={() => setEditMode({...editMode, editHealth: true})}>Edit</Button>
        </Grid> 
        : // Edit View !editMode.editHealth = false
        <Grid item>
          <form>
            <TextField 
              label="Armor Class"
              onChange={event => dispatch({
                type: 'UPDATE_CHARACTER',
                payload: {
                  baseInformation: {
                    ...character.baseInformation,
                    armor_class: event.target.value
                  }
                }
              })}
              type="number"
              value={character.baseInformation.armor_class}
            />

            <TextField 
              label="Current Health Points"
              onChange={event => dispatch({
                type: 'UPDATE_CHARACTER',
                payload: {
                  baseInformation: {
                    ...character.baseInformation,
                    current_hit_points: event.target.value
                  }
                }
              })}
              type="number"
              value={character.baseInformation.current_hit_points}
            />

            <TextField
              label="Max Health Points"
              onChange={event => dispatch({
                type: 'UPDATE_CHARACTER',
                payload: {
                  baseInformation: {
                    ...character.baseInformation,
                    max_hit_points: event.target.value
                  }
                }
              })}
              type="number"
              value={character.baseInformation.max_hit_points}
            />

            <TextField 
              label="Temporary Health Points"
              onChange={event => dispatch({
                type: 'UPDATE_CHARACTER',
                payload: {
                  baseInformation: {
                    ...character.baseInformation,
                    temporary_hit_points: event.target.value
                  }
                }
              })}
              type="number"
              value={character.baseInformation.temporary_hit_points}
            />

            <ButtonGroup variant="outlined">
              <Button 
                color="secondary" 
                onClick={() => {
                  cancelEdit();
                  setEditMode({...editMode, editHealth: false});
                }}
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                onClick={() => {
                saveEdit();
                setEditMode({...editMode, editHealth: false});
                }}
              >
                Save
              </Button>
            </ButtonGroup>
          </form>
        </Grid>
      }

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
        <List>
          {character.features.map((feature, index) => {
            return(
              <ListItem key={index}>
                <strong>{feature.feature_name}</strong>: {feature.feature_description}
              </ListItem>
            );
          })}
        </List>
        <p>{JSON.stringify(character.features)}</p>
      </Grid>

      <Grid item>
        <h2>Skill Proficiencies</h2>
        
        <List>
          {skillsAndSavingThrows.skillsList.map(skill => {
            let skillElement = <ListItem key={skill.id}>{skill.skill_name}</ListItem>;
            // console.log('skill.id', skill.id);
            for (let proficiency of character.skillProficiencies){
              // console.log('proficiency.id', proficiency.id);
              if (proficiency.id === skill.id) {
                // console.log('id is equal')
                return skillElement = <ListItem key={skill.id}>{skill.skill_name} Proficient</ListItem>;
              }   
            }
            return skillElement;
          })}
        </List>
        <p>{JSON.stringify(character.skillProficiencies)}</p>
      </Grid>

      <Grid item>
        <h2>Saving Throw Proficiencies</h2>
        <List>
          {skillsAndSavingThrows.savingThrowsList.map(savingThrow => {
            let savingThrowElement = <ListItem key={savingThrow.id}>{savingThrow.saving_throw_name}</ListItem>;
            for (let proficiency of character.savingThrowProficiencies) {
              if (proficiency.id === savingThrow.id) {
                savingThrowElement = <ListItem key={savingThrow.id}>{savingThrow.saving_throw_name} Proficient</ListItem>;
              }
            }
            return savingThrowElement;
            })}
        </List>
        <p>{JSON.stringify(character.savingThrowProficiencies)}</p>
      </Grid>

      <Grid item>
        <h2>Languages Known</h2>
        <List>
          {character.languagesKnown.map(language => {
            return <ListItem key={language.id}>{language.language_name}</ListItem>
          })}
        </List>
        <p>{JSON.stringify(character.languagesKnown)}</p>
      </Grid>
    </Grid>
  );
}// end CharacterSheetMain

export default CharacterSheetMain;