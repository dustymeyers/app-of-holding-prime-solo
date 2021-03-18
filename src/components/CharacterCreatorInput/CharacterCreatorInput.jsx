import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Button,
  ButtonGroup, 
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';

function CharacterCreatorInput() {
  const dispatch = useDispatch();

  const [characterNameInput, setCharacterNameInput] = useState('');
  const [characterGenderInput, setCharacterGenderInput] = useState('');
  const [characterParameters, setCharacterParameters] = useState({
    playStyle: '',
    magicStyle: ''
  });

  const generateCharacter = () => {
    console.log('clicked generateCharacter');

    if (
        characterParameters.playStyle === '' || 
        characterParameters.magicStyle === '' ||
        characterGenderInput === '' ||
        characterNameInput === ''
    ) { // TODO ADD SWAL
      return alert('pick an option before hitting submit')
    } else {
      dispatch({
        type: 'GET_RANDOM_CHARACTER',
        payload: characterParameters
      })
    }
  } // end generateCharacter



  return(
    <Grid container spacing ={3}>
      <Grid item>
        <h3>This component will house the character creation input.</h3>
      </Grid>
      {/* Play Style Selector */}

      <form>
        <Grid item>
          <FormControl>
            <InputLabel id="play-style-select-label">Play Style</InputLabel>
            <Select
              id="play-style-select"
              labelId="play-style-select-label"
              onChange={event => setCharacterParameters({...characterParameters, playStyle: event.target.value})}
              required
              value={characterParameters.playStyle}
            >
              <MenuItem value="">
                <em>Choose one</em>
              </MenuItem>
              <MenuItem value="hackAndSlash">Hack and Slash</MenuItem>
              <MenuItem value="roleplay">Roleplay</MenuItem>
            </Select>
            <FormHelperText>Please choose a play style for your character.</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <InputLabel id="magic-style-select-label">Magic Style</InputLabel>
            <Select
              id="magic-style-select"
              labelId="magic-style-select-label"
              onChange={event => setCharacterParameters({...characterParameters, magicStyle: event.target.value})}
              required
              value={characterParameters.magicStyle}
            >
              <MenuItem value="">
                <em>Choose one</em>
              </MenuItem>
              <MenuItem value="Arcane">Arcane</MenuItem>
              <MenuItem value="divineNatural">Divine/Natural</MenuItem>
              <MenuItem value="noMagic">No Magic</MenuItem>          
            </Select>
            <FormHelperText>Please choose a magic style for your character, if you'd like one.</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              id="gender-select"
              labelId="gender-select-label"
              onChange={event => setCharacterGenderInput(event.target.value)}
              required
              value={characterGenderInput}
            >
              <MenuItem value="">
                <em>Choose one</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="noneBinary">None Binary</MenuItem>          
            </Select>
            <FormHelperText>Please choose a gender for your character.</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <TextField
              helperText="Please add a name for your character."
              label="Character Name"
              onChange={(event) => setCharacterNameInput(event.target.value)}
              type="text"
              value={characterNameInput}
              required
            />
          </FormControl>
        </Grid>
      </form>

      <Grid item>
        <ButtonGroup variant="contained">
          <Button color="secondary">Cancel</Button>
          <Button color="primary" onClick={generateCharacter}>
            Next
          </Button>
        </ButtonGroup>
      </Grid>

    </Grid>
  )
} // end CharacterCreatorInput  

export default CharacterCreatorInput;