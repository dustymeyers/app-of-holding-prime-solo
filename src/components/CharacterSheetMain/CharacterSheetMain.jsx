import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


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

  // base ability score stats.
  const baseStrength = character.baseInformation.str_score;
  const baseDexterity = character.baseInformation.dex_score;
  const baseConstitution = character.baseInformation.con_score;
  const baseIntelligence = character.baseInformation.int_score;
  const baseWisdom = character.baseInformation.wis_score;
  const baseCharisma = character.baseInformation.cha_score;
  const proficiencyBonus = Math.ceil((character.baseInformation.level)/4) + 1;

  // state for opening dialog edit sections
  const [editMode, setEditMode] = useState({
    editAbilityScores: false,
    editBasicInfo: false,
    editHealth: false
  });

  // calculates the ability score modifier, uses the base ability score as argument
  const abilityScoreModifier = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
  }

  // calculates passive perception, checks for proficiency
  function passivePerception(skillsArray) {
    let passivePerceptionScore = 10 + abilityScoreModifier(baseWisdom);
    for (let proficiency of skillsArray) {
      // id 12 is the wisdom score, passive perception is
      if (proficiency.id === 12) {
        passivePerceptionScore += proficiencyBonus;
      }
    }
    return passivePerceptionScore;
  }

  // handles the cancel button inside edit dialog
  const cancelEdit = () => {
    console.log('clicked cancel');
    setEditMode(false);
  }

  // handles the save button inside edit dialog
  const saveEdit = () => {
    console.log('clicked save');
    dispatch({
      type: 'SAVE_CHARACTER_UPDATES',
      payload: character
    });
    setEditMode(false);
  }

  return(
    <Grid container spacing={5}>
      {/* Basic character information, including name, class, race, level and gender */}
      <Grid item xs={4}>
        {!editMode.editBasicInfo ?
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Grid container alignItems="flex-end" justify="space-between">
                <Grid item>
                  <Typography variant="h4">Character</Typography>
                </Grid>

                <Grid item>
                  <IconButton onClick={() => setEditMode({...editMode, editBasicInfo: true})} >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Name</strong>: {character.baseInformation.character_name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Class and Level</strong>: Level {character.baseInformation.level} {character.baseInformation.class_name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Background</strong>: {character.baseInformation.background}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Race</strong>: {character.baseInformation.race_name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Gender</strong>: {character.baseInformation.gender}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Alignment</strong>: {character.baseInformation.alignment}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Experience Points</strong>: {character.baseInformation.experience_points}
              </Typography>
            </Grid>
          </Grid>
          :
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item container justify="flex-end">
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
      </Grid>  {/* End basic character info */}
      
      {/* Ability score section */}
      <Grid item xs={4}>
        {!editMode.editAbilityScores ?
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Grid container alignItems="flex-end" wrap="nowrap" justify="space-between">
                <Grid item>
                  <Typography variant="h4">Ability Scores</Typography>
                </Grid>

                <Grid item>
                  <IconButton onClick={() => setEditMode({...editMode, editAbilityScores: true})}>
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Strength</strong>: {baseStrength + character.baseInformation.str_bonus}, <strong>Modifier</strong>: {abilityScoreModifier(baseStrength)}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Dexterity</strong>: {baseDexterity + character.baseInformation.dex_bonus}, <strong>Modifier</strong>: {abilityScoreModifier(baseDexterity)}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Constitution</strong>: {baseConstitution + character.baseInformation.con_bonus}, <strong>Modifier</strong>: {abilityScoreModifier(baseConstitution)}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Intelligence</strong>: {baseIntelligence + character.baseInformation.int_bonus}, <strong>Modifier</strong>: {abilityScoreModifier(baseIntelligence)}
              </Typography>
            </Grid>
            
            <Grid item>
              <Typography variant="body1">
                <strong>Wisdom</strong>: {baseWisdom + character.baseInformation.wis_bonus}, <strong>Modifier</strong>: {abilityScoreModifier(baseWisdom)}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Charisma</strong>: {baseCharisma + character.baseInformation.cha_bonus}, <strong>Modifier</strong>: {abilityScoreModifier(baseCharisma)}
              </Typography>
            </Grid>
          </Grid> :
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item container justify="flex-end">              
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
      </Grid> {/* End Ability Score section */}

      {/* renders character health and armor class as well as edit button */}
      <Grid item xs={4}>
        {!editMode.editHealth ? 
          // Text View !editMode.editHealth = true
          <Grid container direction="column" spacing={3}>
            <Grid item container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  AC: {character.baseInformation.armor_class}
                </Typography>
              </Grid>

              <IconButton onClick={() => setEditMode({...editMode, editHealth: true})}>
                <EditIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <Typography variant="h5">
                <strong>Current Health Points</strong>: {character.baseInformation.current_hit_points}
              </Typography>
            </Grid>
            
            <Grid item>
              <Typography variant="h5">
                <strong>Max Health Points</strong>: {character.baseInformation.max_hit_points}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5">
                <strong>Temporary Health Points</strong>: {character.baseInformation.temporary_hit_points}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5">
                <strong>Hit Die</strong>: 1d{character.baseInformation.hit_die}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Hit Dice Available</strong>: {character.baseInformation.hit_dice_available}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Maximum Number of Hit Dice</strong>: {character.baseInformation.level}
              </Typography>
            </Grid>

          </Grid> 
          : // Edit View !editMode.editHealth = false
          <Grid container direction="column" spacing={2}>
            
            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>

            <Grid item container justify="flex-end">
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
      </Grid> {/* End health section */}

      {/* Skill Proficiencies section */}
      <Grid item xs={4}>
        <Typography variant="h5">Skill Proficiencies</Typography>
        <Typography variant="caption" paragraph>For skill checks, add the respective ability score modifier to each roll. If you are proficient, add your proficiency bonus as well.</Typography>
        
        <List>
          {skillsAndSavingThrows.skillsList.map(skill => {
            let skillElement = (
              <ListItem key={skill.id}>
                <ListItemText>{skill.skill_name}</ListItemText>
              </ListItem>
            );
            // console.log('skill.id', skill.id);
            for (let proficiency of character.skillProficiencies){
              // console.log('proficiency.id', proficiency.id);
              if (proficiency.id === skill.id) {
                // console.log('id is equal')
                return skillElement = (
                  <ListItem key={skill.id}>
                    <ListItemText>{skill.skill_name} <strong>Proficient</strong></ListItemText>
                  </ListItem>
                );
              }   
            }
            return skillElement;
          })}
        </List>
      </Grid> {/* End Skill Proficiencies section */}

      {/* This section holds saving throws, languages, proficiency bonus, & passive perception. Wrapped together to dynamically design the page.  */}
      <Grid item container direction="column" xs={8}>
        <Grid item container spacing={5}>
          {/* Saving Throws Proficiencies section */}
          <Grid item xs={6}>
            <Typography variant="h5">Saving Throw Proficiencies</Typography>
            <Typography variant="caption" paragraph>For saving throws, add the respective ability score modifier to each roll. If you are proficient, add your proficiency bonus as well.</Typography>
            <List>
              {skillsAndSavingThrows.savingThrowsList.map(savingThrow => {
                let savingThrowElement = (
                  <ListItem key={savingThrow.id}>
                    <ListItemText>{savingThrow.saving_throw_name}</ListItemText>
                  </ListItem>
                );
                for (let proficiency of character.savingThrowProficiencies) {
                  if (proficiency.id === savingThrow.id) {
                    savingThrowElement = (
                      <ListItem key={savingThrow.id}>
                        <ListItemText>{savingThrow.saving_throw_name} <strong>Proficient</strong></ListItemText>
                      </ListItem>
                    );
                  }
                }
                return savingThrowElement;
                })}
            </List>
          </Grid>  {/* Saving Throws Proficiencies section */}

          {/* Proficiency Bonus/Passive Perception and Languages, wrapped together for dynamic rendering */}
          <Grid item container direction="column" xs={6} justify="space-between">
            {/* Proficiency Bonus/Passive Perception */}
            <Grid item container direction="column" spacing ={3}>
              <Grid item>
                <Typography variant="h5">Proficiency Bonus: +{proficiencyBonus}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Passive Perception: <strong>{passivePerception(skillsAndSavingThrows.skillsList)}</strong></Typography>
              </Grid>
            </Grid>{/* End Proficiency Bonus/Passive Perception */}

            {/* Languages Known */}
            <Grid item>
              <Typography variant="h5">Languages Known</Typography>
              <List>
                {character.languagesKnown.map(language => {
                  return(
                  <ListItem key={language.id}>
                    <ListItemText>{language.language_name}</ListItemText>
                  </ListItem>
                  );
                })}
              </List>
            </Grid>{/* End Languages Known */}
          </Grid>
        </Grid>

        {/* Character Features Section */}
        <Grid item>
          <Typography variant="h5">Features</Typography>
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
        </Grid>{/* End Character Features Section */}
      </Grid>
    </Grid>
  );
}// end CharacterSheetMain

export default CharacterSheetMain;