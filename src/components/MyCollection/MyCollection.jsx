import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Material-UI Components
import { 
  Button,         // replace <button>
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [open, setOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState({
    id: 0,
    name:''
  });

  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTERS',
      payload: 'FALSE', // query for all characters that are not marked as dead
    })
  }, []);
  
  const handleDeleteClick = (characterId, characterName) => {
    console.log('delete characterId', characterId);
    setOpen(true);
    setCharacterToDelete({ id: characterId, name: characterName});

   
  } // end handleDeleteClick

  // routes user to character specific CharacterSheet view
  const handleViewClick = (characterId) => {
    console.log('view characterId', characterId);
    history.push(`/characterSheet/${characterId}`);
  } // end handleViewClick

  const cancelDelete = () => {
    setCharacterToDelete({ id: 0, name: '' });
    setOpen(false);
  }

  const deleteCharacter = () => {
    dispatch({
      type: 'DELETE_CHARACTER',
      payload: characterToDelete.id
    })
    setCharacterToDelete({ id: 0, name: '' });
    setOpen(false);
  }

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
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleViewClick(character.id)}
                    >
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
                    <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDeleteClick(character.id, character.character_name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}        
          </TableBody>

        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{characterToDelete.name}</strong> along with all of their equipment and spells? This can not be undone.
          </DialogContentText>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={cancelDelete}>
              No, I'm not ready to delete {characterToDelete.name}
            </Button>
            <Button variant="contained" color="primary" onClick={deleteCharacter}>
              Yes. I've said my goodbyes to {characterToDelete.name}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

    </>
  );
}// end MyCollection

export default MyCollection;