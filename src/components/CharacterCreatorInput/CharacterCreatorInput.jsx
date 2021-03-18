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
              labelId="play-style-select-label"
              id="play-style-select"
              required
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
              labelId="magic-style-select-label"
              id="magic-style-select"
              required
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
              labelId="gender-select-label"
              id="gender-select"
              required
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
              type="text"
              value="character_name"
              required
            />
          </FormControl>
        </Grid>
      </form>

      <Grid item>
        <ButtonGroup variant="contained">
          <Button color="secondary">Cancel</Button>
          <Button color="primary">Next</Button>
        </ButtonGroup>
      </Grid>

    </Grid>
  )
} // end CharacterCreatorInput  

export default CharacterCreatorInput;