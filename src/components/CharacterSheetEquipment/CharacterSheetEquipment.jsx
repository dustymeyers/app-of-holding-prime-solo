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
  FormControl,
  Grid,
  Paper,
  Table,          // replaces <table>
  TableBody,      // replaces <tbody>
  TableCell,      // replaces <td>
  TableContainer, // acts as a <div> for the table
  TableHead,      // replaces <thead>
  TableRow, 
  TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

function CharacterSheetEquipment() {
  const character = useSelector(store => store.characters.characterDetails);
  const dispatch = useDispatch();

  const [openAddItem, setOpenAddItem] = useState(false);

  const totalCopper = character.baseInformation.cp_total;
  const totalSilver = character.baseInformation.sp_total;
  const totalElectrum = character.baseInformation.ep_total;
  const totalGold = character.baseInformation.gp_total;
  const totalPlatinum = character.baseInformation.pp_total;

  const closeAddItem = () => {
    setOpenAddItem(false);
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
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  Fake Item
                  <IconButton>
                    <InfoIcon color="action" onClick={() => console.log('info clicked')}/>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon color="secondary" onClick={() => console.log('delete clicked')} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add equipment, opens dialog box that allows user to search through available equipment */}
        <IconButton>
          <LibraryAddIcon fontSize="large" color="action" onClick={() => setOpenAddItem(true)} /> 
        </IconButton>
        <Dialog
          open={openAddItem}
          onClose={closeAddItem}
          scroll="paper"
        >
          <DialogActions>
            <Button color="secondary" onClick={closeAddItem}>Cancel</Button>
          </DialogActions>
        </Dialog>

      </Grid>
    </Grid>
  );
}// end CharacterSheetEquipment

export default CharacterSheetEquipment;