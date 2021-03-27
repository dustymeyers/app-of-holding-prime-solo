import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  ButtonGroup, 
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
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

  // event handler for "Cancel" button
  const cancelCharacterCreator = () => {
    history.push('/')
  }

  // event handler for "Next" button
  // sends user inputs as character generator parameters
  // will return generated data on next view
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
    <Grid container alignItems="center" component={Paper} direction="column" spacing={3}>
      <Grid item xs={12}>
        <Box p={4}>
          <Grid container align="left" spacing={4}>
            <Grid item>
              <Typography variant="h3">
                Welcome to the Character Creator
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body">
                Please input your desired play style, as well as your desired magic style. Using this information, the App of Holding will randomly generate your character's class and race, as well as it's base ability score rolls. Feel free to customize your character with a name and a gender.
              </Typography>            
            </Grid>
          </Grid>          
        </Box>
      </Grid>
      {/* Play Style Selector */}

      <Grid item xs={12}>
        <Box p={4}>
          <Grid container justify="center" spacing="5">          
            <Grid item xs={5}>
              <FormControl fullWidth>
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

            <Grid item xs={5}>
              <FormControl fullWidth>
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

            <Grid item xs={5}>
              <FormControl fullWidth>
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
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Non-Binary">Non-Binary</MenuItem>          
                </Select>
                <FormHelperText>Please choose a gender for your character.</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth>
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
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <ButtonGroup variant="contained">
          <Button color="secondary" onClick={cancelCharacterCreator}>
            Cancel
          </Button>
          
          <Button color="primary" onClick={generateCharacter}>
            Next
          </Button>
        </ButtonGroup>
      </Grid>

    </Grid>
  )
} // end CharacterCreatorInput  

export default CharacterCreatorInput;