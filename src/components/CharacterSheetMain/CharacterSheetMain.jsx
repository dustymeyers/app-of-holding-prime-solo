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
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

function CharacterSheetMain({ }) {
  console.log('skills and saving throws', skillsAndSavingThrows);
  const character = useSelector(store => store.characters.characterDetails);
  const skillsAndSavingThrows = useSelector(store => store.characterSheetComponents.skillsAndSavingThrowsList);
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

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_CHARACTER_SHEET_COMPONENTS'
  //   });
  //   dispatch({
  //     type: 'FETCH_CHARACTER',
  //     payload: paramsObject.id
  //   });
  // }, []);

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
      type: 'SAVE_CHARACTER_UPDATES',
      payload: character
    });
    setEditMode(false);
  }

  const handleEdit = (key) => {
    setEditMode({ key: true});
  }

  console.log(editMode)

  return(
    <Grid container spacing={5}>
      {/* Basic character information, including name, class, race, level and gender */}
      <Grid item xs={4}>
        {!editMode.editBasicInfo ?
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Grid container alignItems="flex-end" direction="row">
                <Grid item>
                  <Typography variant="h3">Character</Typography>
                </Grid>
                <Grid item>
                  <IconButton>
                    <EditIcon onClick={() => setEditMode({...editMode, editBasicInfo: true})} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="body"><strong>Name</strong>: {character.baseInformation.character_name}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body"><strong>Class and Level</strong>: Level {character.baseInformation.level} {character.baseInformation.class_name}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body"><strong>Background</strong>: {character.baseInformation.background}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body"><strong>Race</strong>: {character.baseInformation.race_name}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body"><strong>Gender</strong>: {character.baseInformation.gender}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body"><strong>Alignment</strong>: {character.baseInformation.alignment}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body"><strong>Experience Points</strong>: {character.baseInformation.experience_points}</Typography>
            </Grid>
          </Grid>
          :
          <Grid container direction="column" spacing={2}>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
          </Grid>
        }
      </Grid>
      
      <Grid item xs={4}>
        {!editMode.editAbilityScores ?
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">Ability Scores:</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body">Strength: {baseStrength + character.baseInformation.str_bonus}, Modifier: {abilityScoreModifier(baseStrength)}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body">Dexterity: {baseDexterity + character.baseInformation.dex_bonus}, Modifier: {abilityScoreModifier(baseDexterity)}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body">Constitution: {baseConstitution + character.baseInformation.con_bonus}, Modifier: {abilityScoreModifier(baseConstitution)}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body">Intelligence: {baseIntelligence + character.baseInformation.int_bonus}, Modifier: {abilityScoreModifier(baseIntelligence)}</Typography>
            </Grid>
            
            <Grid item>
              <Typography variant="body">Wisdom: {baseWisdom + character.baseInformation.wis_bonus}, Modifier: {abilityScoreModifier(baseWisdom)}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body">Charisma: {baseCharisma + character.baseInformation.cha_bonus}, Modifier: {abilityScoreModifier(baseCharisma)}</Typography>
            </Grid>

            <Grid>
              <Button variant="outlined" onClick={() => setEditMode({...editMode, editAbilityScores: true})}>Edit</Button>
            </Grid>
          </Grid> :
          <Grid container direction="column" spacing={2}>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
          </Grid>
        }
      </Grid>

      {/* renders character health and armor class with edit button */}
      <Grid item xs={4}>
        {!editMode.editHealth ? 
          // Text View !editMode.editHealth = true
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">AC: {character.baseInformation.armor_class}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h3">Current Health Points: {character.baseInformation.current_hit_points}</Typography>
            </Grid>
            
            <Grid item>
              <Typography variant="h4">Max Health Points: {character.baseInformation.max_hit_points}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h4">Temporary Health Points: {character.baseInformation.temporary_hit_points}</Typography>
            </Grid>

            <Grid item>
              <Button variant="outlined" onClick={() => setEditMode({...editMode, editHealth: true})}>Edit</Button>
            </Grid>
          </Grid> 
          : // Edit View !editMode.editHealth = false
          <Grid container direction="column" spacing={2}>
            
            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
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
            </Grid>
          </Grid>
        }
      </Grid>


      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h3">Hit Die: 1d{character.baseInformation.hit_die}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">Hit Dice Available: {character.baseInformation.hit_dice_available}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">Maximum Number of Hit Dice: {character.baseInformation.level}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column">
          <h2>Proficiency Bonus: +{proficiencyBonus}</h2>
          <h3>Passive Perception: <strong>TODO</strong></h3>
        </Grid>
      </Grid>



      <Grid item>
        <h2>Features: </h2>
        <List>
          {character.features.map((feature, index) => {
            return(
              <ListItem key={index}>
                <ListItemText>
                  <strong>{feature.feature_name}</strong>: {feature.feature_description}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
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
      </Grid>

      <Grid item>
        <Typography variant="h2">Saving Throw Proficiencies</Typography>
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
      </Grid>

      <Grid item>
        <Typography variant="h2">Languages Known</Typography>
        <List>
          {character.languagesKnown.map(language => {
            return <ListItem key={language.id}>{language.language_name}</ListItem>
          })}
        </List>
      </Grid>
    </Grid>
  );
}// end CharacterSheetMain

export default CharacterSheetMain;