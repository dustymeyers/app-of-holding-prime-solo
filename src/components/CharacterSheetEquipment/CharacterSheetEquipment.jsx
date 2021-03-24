import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Material-UI Components
import {
  Button,
  ButtonGroup,
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
import { AccessAlarm, EditIcon, ThreeDRotation } from '@material-ui/icons';

function CharacterSheetEquipment() {
  const character = useSelector(store => store.characters.characterDetails);
  const dispatch = useDispatch();

  const totalCopper = character.baseInformation.cp_total;
  const totalSilver = character.baseInformation.sp_total;
  const totalElectrum = character.baseInformation.ep_total;
  const totalGold = character.baseInformation.gp_total;
  const totalPlatinum = character.baseInformation.pp_total;
  

  return(
    <Grid container>
      <Grid item>
        CP: {totalCopper}
        SP: {totalSilver}
        EP: {totalElectrum}
        GP: {totalGold}
        PP: {totalPlatinum}
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>

              </TableRow>
            </TableHead>          
          </Table>
        </TableContainer>

      </Grid>
    </Grid>
  );
}// end CharacterSheetEquipment

export default CharacterSheetEquipment;