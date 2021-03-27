import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Material-UI Components
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,          // replaces <table>
  TableBody,      // replaces <tbody>
  TableCell,      // replaces <td>
  TableContainer, // acts as a <div> for the table
  TableHead,      // replaces <thead>
  TableRow, 
  TextField,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteIcon from '@material-ui/icons/Delete';

function CharacterSheetSpells() {
  const character = useSelector(store => store.characters.characterDetails);
  const characterSpellsList = useSelector(store => store.spells.characterSpellsList);
  const spellInfo = useSelector(store => store.characterSheetComponents.spellInformation);
  const spellsList = useSelector(store => store.characterSheetComponents.spellsList);
  const spellsToAddList = useSelector(store => store.spells.spellsToAddList);
  const dispatch = useDispatch();
  const paramsObject = useParams();

  const proficiencyBonus = Math.ceil((character.baseInformation.level)/4) + 1;
  const spellcastingAbility = character.baseInformation.spellcasting_ability;

  const abilityScoreModifier = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
  }
  
  const spellcastingModifier = () => {
    if (spellcastingAbility === 'None') {
      return 0;
    } else if (spellcastingAbility === 'Intelligence') {
      return abilityScoreModifier(character.baseInformation.int_score + character.baseInformation.int_bonus);
    } else if (spellcastingAbility === 'Wisdom') {
      return abilityScoreModifier(character.baseInformation.wis_score + character.baseInformation.wis_bonus);
    } else if (spellcastingAbility === 'Charisma')  {
      return abilityScoreModifier(character.baseInformation.cha_score + character.baseInformation.cha_bonus);
    }
  } 
  
  let spellSaveDc = proficiencyBonus + spellcastingModifier() + 8;

  if (spellcastingAbility === 'None') {
    spellSaveDc = 'None';
  }

  console.log('spellcastingModifier', spellcastingModifier())
  console.log('spellSaveDc', spellSaveDc)

  const [open, setOpen] = useState({
    addSpells: false,
    spellInfo: false,
    editQty: false,
  });

  const closeAddSpells = () => {
    dispatch({ type: 'CLEAR_SPELLS_TO_ADD' })
    setOpen({...open, addSpells: false});
  }

  const closeSpellInfo = () => {
    dispatch({ type: 'CLEAR_SPELL_INFO'});
    setOpen({...open, spellInfo: false});
  }

  const removeSpell = (spellId) => {
    console.log('remove spell', spellId);
    dispatch({
      type: 'REMOVE_SPELL',
      payload: {
        spellId,
        characterId: paramsObject.id
      }
    });
  }

  const saveSpells = () => {
    dispatch({
      type: 'SAVE_SPELLS',
      payload: {
        characterId: paramsObject.id,
        spells: spellsToAddList
      }
    });
    dispatch({ type: 'CLEAR_SPELLS_TO_ADD' });
    setOpen({...open, addSpells: false});
  }

  const spellInformation = (spellApiIndex) => {
    console.log('getting info for spell with id:', spellApiIndex);
    dispatch({ 
      type: 'FETCH_SPELL_INFO',
      payload: spellApiIndex
    });
    setOpen({...open, spellInfo: true});
  }

  return(
    <Grid container direction="column">
      <Grid item xs={10} >
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Typography>Spell Casting Ability: {character.baseInformation.spellcasting_ability}</Typography>
          </Grid>

          <Grid item>            
            <Typography>Spell Save DC: {spellSaveDc}</Typography>
          </Grid>

          <Grid item>
            <Typography>Spell Attack Modifier: {spellcastingModifier()}</Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Add equipment, opens dialog box that allows user to search through available equipment */}
      <Grid item>
        <IconButton onClick={() => setOpen({...open, addSpells: true})} >
          <LibraryAddIcon fontSize="large" color="action" /> 
        </IconButton>
      </Grid>

      <Grid item>
        <h2>Cantrips:</h2>
        <List>
          {characterSpellsList.map((spell, index) => {
              if (spell.spellcasting_level === 0) {
                return(    
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconButton onClick={() => spellInformation(spell.api_index)}>
                        <InfoIcon color="action" />
                      </IconButton>
                    </ListItemIcon>

                    <ListItemText>{spell.spell_name}</ListItemText>

                    <IconButton onClick={() => removeSpell(spell.id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </ListItem>
                )
              }
            })}
        </List>
      </Grid>

      <Grid item>
        <h2>Level 1 Spells:</h2>
        <List>
          {characterSpellsList.map((spell, index) => {
              if (spell.spellcasting_level === 1) {
                return(    
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconButton onClick={() => spellInformation(spell.api_index)}>
                        <InfoIcon color="action" />
                      </IconButton>
                    </ListItemIcon>

                    <ListItemText>{spell.spell_name}</ListItemText>

                    <IconButton onClick={() => removeSpell(spell.id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </ListItem>
                )
              }
            })}
        </List>
      </Grid>

      <Dialog
          open={open.addSpells}
          onClose={closeAddSpells}
          scroll="paper"
        >
          <DialogTitle>Add spells:</DialogTitle>
          <DialogContent >
            <DialogContentText>Add spells to your character sheet by pressing the plus button and then clicking save.</DialogContentText>
            <List>
              {spellsList.map((spell, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconButton onClick={() => {
                        dispatch({
                          type: 'SET_SPELLS_TO_ADD',
                          payload: { id: spell.id }
                        })
                      }}>
                        <AddIcon color="action" />
                      </IconButton>
                    </ListItemIcon>
                    
                    <ListItemText>
                      {spell.spell_name}
                    </ListItemText>

                    <ListItemIcon>
                      <IconButton onClick={() => spellInformation(spell.api_index)}>
                        <InfoIcon color="action" />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={saveSpells}>Save spells</Button>
            <Button color="secondary" onClick={closeAddSpells}>Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for item information, triggers when info button is clicked */}
        <Dialog
          open={open.spellInfo}
          onClose={closeSpellInfo}
          scroll="paper"
        >
          <DialogTitle>{spellInfo.name}</DialogTitle>
          <DialogContent>
          {spellInfo.level > 0 ? <DialogContentText>{spellInfo.school.name} {spellInfo.level} {spellInfo.ritual ? '(ritual)' : <></>}</DialogContentText> : <DialogContentText>Cantrip</DialogContentText>}
            <DialogContentText>Casting Time: {spellInfo.casting_time}</DialogContentText>
            <DialogContentText>Range: {spellInfo.range}</DialogContentText>
            <DialogContentText>
              Components: {spellInfo.components.map((component, index) => {
                console.log('index is', index)
                if (spellInfo.components.length - 1 === index) {
                  return `${component}`;
                } else {
                  return `${component}, `;
                }
              })}
            </DialogContentText>
            {spellInfo.material ? <DialogContentText>Materials Required: {spellInfo.material}</DialogContentText> : <></> }
            <DialogContentText>Duration: {spellInfo.concentration ? 'Concentration,' : <></>} {spellInfo.duration}</DialogContentText>
            {spellInfo.desc.map(description => {
              <DialogContentText>{description}</DialogContentText>
            })}
            {spellInfo.higher_level.map(description => <DialogContentText>{description}</DialogContentText>)}
            <DialogContentText>
              Classes: {spellInfo.classes.map((className, index) => {
                if (spellInfo.classes.length - 1 === index) {
                  return `${className.name}`;
                } else {
                  return `${className.name}, `;
                }
              })}
            </DialogContentText>
          </DialogContent>
        </Dialog>


    </Grid>
  );
}// end CharacterSheetSpells

export default CharacterSheetSpells;