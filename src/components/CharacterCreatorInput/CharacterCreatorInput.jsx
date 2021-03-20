import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

function CharacterCreatorInput({}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [characterParameters, setCharacterParameters] = useState({
    playStyle: '',
    magicStyle: '',
    character_name: '',
    gender: ''
  });

  const cancelCharacterCreator = () => {
    history.push('/')
  }

  const generateCharacter = () => {
    console.log('clicked generateCharacter');

    if (
        characterParameters.playStyle === '' || 
        characterParameters.magicStyle === '' ||
        characterParameters.gender === '' ||
        characterParameters.character_name === ''
    ) { // TODO ADD SWAL
      return alert('pick an option before hitting submit')
    } else {
      dispatch({
        type: 'GET_RANDOM_CHARACTER',
        payload: characterParameters,
        onComplete: history.push('/characterCreator/review') 
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
              <MenuItem value="arcane">Arcane</MenuItem>
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
              onChange={event => setCharacterParameters({...characterParameters, gender: event.target.value})}
              required
              value={characterParameters.gender}
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
              onChange={(event) => setCharacterParameters({...characterParameters, character_name: event.target.value})}
              type="text"
              value={characterParameters.character_name}
              required
            />
          </FormControl>
        </Grid>
      </form>

      <Grid item>
        <ButtonGroup variant="contained">
          <Button color="secondary" onClick={cancelCharacterCreator}>Cancel</Button>
          <Button color="primary" onClick={generateCharacter}>
            Next
          </Button>
        </ButtonGroup>
      </Grid>

    </Grid>
  )
} // end CharacterCreatorInput  

export default CharacterCreatorInput;