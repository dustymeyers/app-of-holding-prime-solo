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
  const spellsList = useSelector(store => store.characterSheetComponents.spellsList);
  const spellsToAddList = useSelector(store => store.spells.spellsToAddList);
  const dispatch = useDispatch();
  const paramsObject = useParams();
  console.log(characterSpellsList)

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
    dispatch({ type: 'CLEAR_SPELLS_INFO'});
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
    <Grid container>
      {/* Add equipment, opens dialog box that allows user to search through available equipment */}
      <IconButton onClick={() => setOpen({...open, addSpells: true})} >
        <LibraryAddIcon fontSize="large" color="action" /> 
      </IconButton>

      <Grid item>
        <h2>Cantrips:</h2>
        <List>
          {characterSpellsList.map(spell => {
              if (spell.spellcasting_level === 0) {
                return(    
                  <ListItem>
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
          {characterSpellsList.map(spell => {
              if (spell.spellcasting_level === 1) {
                return(    
                  <ListItem>
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
              {spellsList.map(spell => {
                return (
                  <ListItem key={spell.id}>
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
          <DialogTitle>Spell name goes here</DialogTitle>
          <DialogContent>
            <DialogContentText>This is where spell Info goes</DialogContentText>
          </DialogContent>
        </Dialog>


    </Grid>
  );
}// end CharacterSheetSpells

export default CharacterSheetSpells;