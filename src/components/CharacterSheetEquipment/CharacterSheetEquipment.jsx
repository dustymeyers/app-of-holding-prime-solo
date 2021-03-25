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
  Paper,
  Table,          // replaces <table>
  TableBody,      // replaces <tbody>
  TableCell,      // replaces <td>
  TableContainer, // acts as a <div> for the table
  TableHead,      // replaces <thead>
  TableRow, 
  TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

function CharacterSheetEquipment() {
  const character = useSelector(store => store.characters.characterDetails);
  const equipmentList = useSelector(store => store.characterSheetComponents.equipmentList);
  const equipmentToAddList = useSelector(store => store.equipment.equipmentToAddList);
  const characterEquipment = useSelector(store=> store.equipment.characterEquipmentList);
  const dispatch = useDispatch();
  const paramsObject = useParams();

  const [open, setOpen] = useState({
    addItem: false,
    itemInfo: false,
  });

  const totalCopper = character.baseInformation.cp_total;
  const totalSilver = character.baseInformation.sp_total;
  const totalElectrum = character.baseInformation.ep_total;
  const totalGold = character.baseInformation.gp_total;
  const totalPlatinum = character.baseInformation.pp_total;

  const addItems = () => {
    dispatch({
      type: 'SAVE_ITEMS',
      payload: {
        characterId: paramsObject.id,
        items: equipmentToAddList
      }
    })
    setOpen({...open, addItem: false});
  }

  const closeAddItem = () => {
    dispatch({ type: 'CLEAR_ITEMS_TO_ADD' })
    setOpen({...open, addItem: false});
  }
  
  const closeItemInfo = () => {
    setOpen({...open, itemInfo: false});
  }

  const itemInformation = (equipmentApiIndex) => {
    console.log('getting info for item with id:', equipmentApiIndex);
    setOpen({...open, itemInfo: true});
  }

  const removeItem = (equipmentId) => {
    console.log('remove item', equipmentId);
  }

  return(
    <Grid container>
      {/* Currency tracker */}
      <Grid item>
        CP: {totalCopper}
        SP: {totalSilver}
        EP: {totalElectrum}
        GP: {totalGold}
        PP: {totalPlatinum}
      </Grid>

      {/* Character's Equipment library */}
      <Grid item>
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>QTY</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>{/* Remove button column */}</TableCell>
              </TableRow>
            </TableHead>   
          
            <TableBody>
              {characterEquipment.map(item => {
                return(
                  <TableRow key={item.id}>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>
                      {item.equipment_name}

                      <IconButton onClick={() => itemInformation(item.api_index)}>
                        <InfoIcon color="action" />
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={() => removeItem(item.id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>
        
        <Dialog
          open={open.itemInfo}
          onClose={closeItemInfo}
          scroll="paper"
        >
          <DialogContent>
            <DialogTitle>Fake Item</DialogTitle>
            <DialogContentText>It does a lot of damage to you, costs 5 gp.</DialogContentText>
          </DialogContent>
        </Dialog>

        {/* Add equipment, opens dialog box that allows user to search through available equipment */}
        <IconButton onClick={() => setOpen({...open, addItem: true})} >
          <LibraryAddIcon fontSize="large" color="action" /> 
        </IconButton>

        {/* Dialog for full equipment library, allows users to add equipment to their character sheet */}
        <Dialog
          open={open.addItem}
          onClose={closeAddItem}
          scroll="paper"
        >
          <DialogContent>
            <List>
              {equipmentList.map(equipment => {
                return (
                  <ListItem key={equipment.id}>
                    <IconButton onClick={() => {
                      dispatch({
                        type: 'SET_ITEMS_TO_ADD',
                        payload: { id: equipment.id }
                      })
                    }}>
                      <AddIcon color="action" />
                    </IconButton>

                    {equipment.equipment_name}

                    <IconButton onClick={() => itemInformation(equipment.api_index)}>
                      <InfoIcon color="action" />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={addItems}>Save Items</Button>
            <Button color="secondary" onClick={closeAddItem}>Cancel</Button>
          </DialogActions>
        </Dialog>

      </Grid>
    </Grid>
  );
}// end CharacterSheetEquipment

export default CharacterSheetEquipment;