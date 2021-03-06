import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

function CharacterSheetEquipment() {
  const character = useSelector(store => store.characters.characterDetails);
  const equipmentList = useSelector(store => store.characterSheetComponents.equipmentList);
  const equipmentInfo = useSelector(store => store.characterSheetComponents.equipmentInformation);
  const equipmentToAddList = useSelector(store => store.equipment.equipmentToAddList);
  const characterEquipment = useSelector(store=> store.equipment.characterEquipmentList);
  const dispatch = useDispatch();
  const paramsObject = useParams();
  const [qtyToEdit, setQtyToEdit] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [editMode, setEditMode] = useState({
    editCoinPurse: false
  });
  
  const [open, setOpen] = useState({
    addItem: false,
    itemInfo: false,
    editQty: false,
  });

  const totalCopper = character.baseInformation.cp_total;
  const totalSilver = character.baseInformation.sp_total;
  const totalElectrum = character.baseInformation.ep_total;
  const totalGold = character.baseInformation.gp_total;
  const totalPlatinum = character.baseInformation.pp_total;

  // handles the add items button
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
    dispatch({ type: 'CLEAR_EQUIPMENT_INFO'})
    setOpen({...open, itemInfo: false});
  }

  const itemInformation = (equipmentApiIndex) => {
    console.log('getting info for item with id:', equipmentApiIndex);
    dispatch({ 
      type: 'FETCH_EQUIPMENT_INFO',
      payload: equipmentApiIndex
    });
    setOpen({...open, itemInfo: true});
  }

  const removeItem = (equipmentId) => {
    console.log('remove item', equipmentId);
    dispatch({
      type: 'REMOVE_EQUIPMENT',
      payload: {
        equipmentId,
        characterId: paramsObject.id
      }
    })
  }

  const saveQty = () => {
    console.log(`Save item ${itemId}'s qty to ${qtyToEdit}`);
    dispatch({
      type: 'UPDATE_EQUIPMENT_QTY',
      payload: {
        characterId: paramsObject.id,
        equipment_id: itemId,
        qty: qtyToEdit
      }      
    })
    setOpen({...open, editQty: false});
  }


  return(
    <Grid container spacing={5} justify="center" direction="column">
      <Grid item container justify="center" xs={12}>
        <Typography variant="h2">Equipment</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" paragraph>The equipment you have for this character will be available in the table below. Feel free to add more equipment with the plus button. The info button provides information for each item using the dnd5eapi. To learn more about this technology, click <a href="http://www.dnd5eapi.co/">here</a>.</Typography>
      </Grid>
      
      <Grid item container direction="row" justify="center" spacing={5} xs={12}> 
        {/* Currency tracker */}
        {!editMode.editCoinPurse ? 
          <>
            <Grid item>
              <Typography variant="h3">CP: {totalCopper}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h3">SP: {totalSilver}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h3">EP: {totalElectrum}</Typography>
            </Grid>

            <Grid item>  
              <Typography variant="h3">GP: {totalGold}</Typography>
            </Grid>

            <Grid item>  
              <Typography variant="h3">PP: {totalPlatinum}</Typography>
            </Grid>
            
            <Grid item>
              <IconButton onClick={() => setEditMode({...editMode, editCoinPurse: true})}>
                <EditIcon />
              </IconButton>
            </Grid>
          </> :        
          <>
            <Grid item>
              <FormControl>
                <TextField 
                  label="Copper Pieces"
                  onChange={event => dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: {
                      baseInformation: {
                        ...character.baseInformation,
                        cp_total: event.target.value
                      }
                    }
                  })}
                  value={totalCopper} 
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl>
                <TextField 
                  label="Silver Pieces" 
                  onChange={event => dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: {
                      baseInformation: {
                        ...character.baseInformation,
                        sp_total: event.target.value
                      }
                    }
                  })}
                  value={totalSilver} 
                />
              </FormControl>
            </Grid>

            <Grid item> 
              <FormControl>
                <TextField 
                  label="Electrum Pieces" 
                  onChange={event => dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: {
                      baseInformation: {
                        ...character.baseInformation,
                        ep_total: event.target.value
                      }
                    }
                  })}
                  value={totalElectrum} 
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl>
                <TextField 
                  label="Gold Pieces" 
                  onChange={event => dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: {
                      baseInformation: {
                        ...character.baseInformation,
                        gp_total: event.target.value
                      }
                    }
                  })}
                  value={totalGold} 
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl>
                <TextField 
                  label="Platinum Pieces" 
                  onChange={event => dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: {
                      baseInformation: {
                        ...character.baseInformation,
                        pp_total: event.target.value
                      }
                    }
                  })}
                  value={totalPlatinum} 
                />
              </FormControl>
            </Grid>

            <Grid item>
              <ButtonGroup>
                <Button 
                  color="secondary" 
                  onClick={() => setEditMode({...editMode, editCoinPurse: false})}
                >
                  Cancel
                </Button>

                <Button
                  color="primary"
                  onClick={() => {
                    dispatch({
                      type: 'SAVE_CHARACTER_UPDATES',
                      payload: character
                    });
                    setEditMode({...editMode, editCoinPurse: false});
                  }}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Grid>
          </>        
        } {/* end currency tracker */}
        {/* Add equipment, opens dialog box that allows user to search through available equipment */}
        <IconButton onClick={() => setOpen({...open, addItem: true})} >
          <LibraryAddIcon fontSize="large" color="action" /> 
        </IconButton>
      </Grid>

      {/* Character's Equipment library */}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell align="right">QTY</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell></TableCell>
                <TableCell>{/* Remove button column */}</TableCell>
              </TableRow>
            </TableHead>   
          
            <TableBody>
              {characterEquipment.map(item => {
                return(
                  <TableRow key={item.id}>
                    <TableCell align="right">
                      {item.qty}
                      <IconButton onClick={() => {
                        setItemId(item.id);
                        setQtyToEdit(item.qty);
                        setOpen({...open, editQty: true});
                      }}>
                        <EditIcon color="action" />
                      </IconButton>
                    </TableCell>

                    <TableCell align="justify">
                      {item.equipment_name}
                    </TableCell>

                    <TableCell>
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
      </Grid> {/* end character's equipment library */}

      {/* Dialog for item qty update */}
      <Dialog
        open={open.editQty}
        onClose={() => setOpen({...open, editQty: false})}
      >
        <DialogContent>
          <FormControl>
            <TextField
              type="number"
              value={qtyToEdit}
              onChange={(event) => setQtyToEdit(event.target.value)}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={saveQty}>Save</Button>
        </DialogActions>
      </Dialog> {/* end dialog for item qty update */}
      
      {/* Dialog for item information, triggers when info button is clicked */}
      <Dialog
        open={open.itemInfo}
        onClose={closeItemInfo}
        scroll="paper"
      >
        <DialogTitle>{equipmentInfo.name}</DialogTitle>

        <DialogContent>
          {equipmentInfo.armor_category ? <DialogContentText>Armor Category: {equipmentInfo.armor_category}</DialogContentText> : <></>}
          {equipmentInfo.armor_class ? <DialogContentText>Armor Class: {equipmentInfo.armor_class.base}</DialogContentText> : <></>}
          {equipmentInfo.weapon_category ? <DialogContentText>Weapon Category: {equipmentInfo.weapon_category}</DialogContentText> : <></>}
          {equipmentInfo.weapon_range ? <DialogContentText>Range: {equipmentInfo.weapon_range}</DialogContentText> : <></>}
          {equipmentInfo.damage ? <DialogContentText>Damage: {equipmentInfo.damage.damage_dice} {equipmentInfo.damage.damage_type.name}</DialogContentText> : <></>}
          {equipmentInfo.vehicle_category ? <DialogContentText>Vehicle Category: {equipmentInfo.vehicle_category}</DialogContentText> : <></>}
          {equipmentInfo.speed ? <DialogContentText>Speed: {equipmentInfo.speed.quantity} {equipmentInfo.speed.unit}</DialogContentText> : <></>}
          {equipmentInfo.capacity ? <DialogContentText>Capacity: {equipmentInfo.capacity}</DialogContentText> : <></>}
          {equipmentInfo.desc ? 
            <DialogContentText>
              {equipmentInfo.desc.map(description => description)}
            </DialogContentText> :
            <></>
          }
          {equipmentInfo.special ? <DialogContentText>{equipmentInfo.special.map(description => description)}</DialogContentText> : <></>}
          <DialogContentText>Cost: {equipmentInfo.cost.quantity} {equipmentInfo.cost.unit} </DialogContentText>
          {equipmentInfo.weight ? <DialogContentText>Weight: {equipmentInfo.weight} lbs</DialogContentText> : <></>}
        </DialogContent>
      </Dialog> {/* end dialog for item information */}

      {/* Dialog for full equipment library, allows users to add equipment to their character sheet */}
      <Dialog
        open={open.addItem}
        onClose={closeAddItem}
        scroll="paper"
      >
        <DialogTitle>Add items:</DialogTitle>
        <DialogContent >
          <DialogContentText>Add items to your character sheet by pressing the plus button and then clicking save.</DialogContentText>
          <List>
            {equipmentList.map(equipment => {
              return (
                <ListItem key={equipment.id}>
                  <ListItemIcon>
                    <IconButton onClick={() => {
                      dispatch({
                        type: 'SET_ITEMS_TO_ADD',
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
          <Button color="primary" onClick={addItems}>Save Items</Button>
          <Button color="secondary" onClick={closeAddItem}>Cancel</Button>
        </DialogActions>
      </Dialog> {/* end add item dialog */}
    </Grid>
  );
}// end CharacterSheetEquipment

export default CharacterSheetEquipment;