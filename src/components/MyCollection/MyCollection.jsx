import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

// Material-UI Components
import { 
  Button,         // replace <button>
  Table,          // replaces <table>
  TableBody,      // replaces <tbody>
  TableCell,      // replaces <td>
  TableContainer, // acts as a <div> for the table
  TableHead,      // replaces <thead>
  TableRow,       // replaces <tr>
  Paper           // <div> that creates the illusion of dimensionality
} from '@material-ui/core';

function MyCollection() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTERS',
      payload: 'FALSE', // query for all characters that are not marked as dead
    })
  }, []);

  const handleViewClick = () => {
    history.push('/characterSheet')
  } // end handleViewClick

  return(
    <>
      <h1>Pick a Character</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Character Name</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Race</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                Ara Galanodel 
                <Button variant="contained" color="primary" onClick={handleViewClick}>View</Button>
              </TableCell>
              <TableCell align="center">8</TableCell>
              <TableCell align="center">Elf</TableCell>
              <TableCell align="center">Fighter</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary">View</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}// end MyCollection

export default MyCollection;