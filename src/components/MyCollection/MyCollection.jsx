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
  const livingCharactersList = useSelector(store => store.characters.charactersList);

  console.log('livingCharactersList', livingCharactersList);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTERS',
      payload: 'FALSE', // query for all characters that are not marked as dead
    })
  }, []);

  const handleDeleteClick = (characterId) => {
    console.log('delete characterId', characterId);

    dispatch({
      type: 'DELETE_CHARACTER',
      payload: characterId
    })
  } // end handleDeleteClick

  // routes user to character specific CharacterSheet view
  const handleViewClick = (characterId) => {
    console.log('view characterId', characterId);
    history.push(`/characterSheet/${characterId}`);
  } // end handleViewClick

  return(
    <>
      <h1>Pick a Character</h1>
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>{/* View Button Column */}</TableCell>
              <TableCell>Character Name</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Race</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell>{/* DELETE Button Column */}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {livingCharactersList.map(character => {
              return(
                <TableRow key={character.id}>
                  {/* View Button */}
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleViewClick(character.id)}>
                      View
                    </Button>
                  </TableCell>

                  {/* Character Name */}
                  <TableCell>
                    {character.character_name}
                  </TableCell>

                  {/* Character Level */}
                  <TableCell align="center">
                    {character.level}
                  </TableCell>

                  {/* Character Race */}
                  <TableCell align="center">
                    {character.race_name}
                  </TableCell>

                  {/* Character Class */}
                  <TableCell align="center">
                    {character.class_name}
                  </TableCell>

                  <TableCell>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(character.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}        
          </TableBody>

        </Table>
      </TableContainer>

    </>
  );
}// end MyCollection

export default MyCollection;