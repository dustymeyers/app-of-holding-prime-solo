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
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


function CharacterSheetSpells() {
  const character = useSelector(store => store.characters.characterDetails);
  const spellsList = useSelector(store => store.characterSheetComponents.spellsList);
  const dispatch = useDispatch();
  const paramsObject = useParams();

  const [open, setOpen] = useState({
    addSpells: false,
    itemInfo: false,
    editQty: false,
  });

  const closeAddSpells = () => {
    dispatch({ type: 'CLEAR_SPELLS_TO_ADD' })
    setOpen({...open, addSpells: false});
  }

  const saveSpells = () => {
    console.log('in saveSpells')
  }

  return(
    <>
      {/* Add equipment, opens dialog box that allows user to search through available equipment */}
      <IconButton onClick={() => setOpen({...open, addSpells: true})} >
        <LibraryAddIcon fontSize="large" color="action" /> 
      </IconButton>

      <Dialog
          open={open.addSpells}
          onClose={closeAddSpells}
          scroll="paper"
        >
          <DialogTitle>Add spells:</DialogTitle>
          <DialogContent >
            <DialogContentText>Add spells to your character sheet by pressing the plus button and then clicking save.</DialogContentText>
            <List>
              {spellsList.map(equipment => {
                return (
                  <ListItem key={equipment.id}>
                    <ListItemIcon>
                      <IconButton onClick={() => {
                        dispatch({
                          type: 'SET_SPELLS_TO_ADD',
                          payload: { id: equipment.id }
                        })
                      }}>
                        <AddIcon color="action" />
                      </IconButton>
                    </ListItemIcon>
                    
                    <ListItemText>
                      {equipment.equipment_name}
                    </ListItemText>

                    <ListItemIcon>
                      <IconButton onClick={() => itemInformation(equipment.api_index)}>
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


    </>
  );
}// end CharacterSheetSpells

export default CharacterSheetSpells;