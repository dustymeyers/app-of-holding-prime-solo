import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

// Material-UI Components
import {
  Box,
  ButtonGroup,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';

function CharacterCreatorReview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const randomCharacter = useSelector(store => store.characterCreatorReducer);

  // these will be used as our payload for user saved character information.
  const characterGender = randomCharacter.gender;
  const characterName = randomCharacter.character_name;
  const characterStrength = randomCharacter.str_score;
  const characterDexterity = randomCharacter.dex_score;
  const characterConstitution = randomCharacter.con_score;
  const characterIntelligence = randomCharacter.int_score;
  const characterWisdom = randomCharacter.wis_score;
  const characterCharisma = randomCharacter.cha_score;
  const classId = randomCharacter.classInfo.id;
  const raceId = randomCharacter.raceInfo.id;
  const skillsArray = randomCharacter.classSkills.concat(randomCharacter.raceSkills);
  const languagesArray = randomCharacter.languagesKnown;
  const savingThrowProficiencies = randomCharacter.savingThrowProficiencies;
  // array1.concat(array2)

  // Base Armor Class is calculated by the dexterity modifier + 10 (unarmored)
  // All ability score modifiers = (ability score - 10) / 2
  const baseArmorClass = Math.floor((characterDexterity + randomCharacter.raceInfo.dex_bonus - 10 ) / 2) + 10;

  // Maximum Hit Points for level one  is calculated by the constitution modifier + max roll for that class's hit die
  const maxHitPoints = randomCharacter.classInfo.hit_die + Math.floor((characterConstitution + randomCharacter.raceInfo.con_bonus - 10 ) / 2);

  console.log('classId', classId);
  const saveCharacter = () => {
    console.log('save clicked');
    dispatch({
      type: 'SAVE_GENERATED_CHARACTER',
      payload: {
        characterName,
        characterStrength,
        characterDexterity,
        characterConstitution,
        characterIntelligence, 
        characterWisdom,
        characterCharisma,
        maxHitPoints,
        characterGender,
        classId,
        raceId,
        skillsArray,
        languagesArray,
        savingThrowProficiencies,
        baseArmorClass
      },
      onComplete: history.push('/')
    });
  }

  const cancelCharacterCreator = () => {
    history.push('/characterCreator');
  }

  return(
    <Box component={Paper} p={5}>
      <Grid container spacing={3}>

        <Grid item xs={12} align="justify">
          <Typography variant="h2" align="center">Character Review</Typography>
          <Typography variant="body1" paragraph>Here is your randomly generated character! Feel free to review the information before committing it to save. If you are unhappy with the class or race that was selected for you, feel free to click the cancel button to start the generator over. You can also edit your ability scores from the character sheet after the character has been created.</Typography>
        </Grid>

        {/* Displays character's randomly generated ability scores */}
        <Grid item xs={4}>
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <Typography variant="h4">Ability Scores:</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body">
                <strong>Strength</strong>: {characterStrength}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body">
                <strong>Dexterity</strong>: {characterDexterity}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body">
                <strong>Constitution</strong>: {characterConstitution}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body">
                <strong>Intelligence</strong>: {characterIntelligence}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body">
                <strong>Wisdom</strong>: {characterWisdom
              }</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body">
                <strong>Charisma</strong>: {characterCharisma}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Displays user chosen name/gender */}
        <Grid item xs={4}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h4">Character Name: {characterName}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5">Gender: {characterGender}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5">Level 1</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Displays character's calculated base armor class and level 1 hit points */}
        <Grid item xs={4}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h4">Base Health & AC:</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5">
                <strong>Starting Health</strong>: {maxHitPoints}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5">
                <strong>Base Armor Class</strong> (unarmored): {baseArmorClass}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Skill proficiencies from race and class displayed here */}
        <Grid item xs={4}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h4">Skill Proficiencies</Typography>
              <Typography variant="body1" paragraph>These skills have been chosen for you based on your class, background, and race.</Typography>
            </Grid>

            <Grid item>
              <List>
                {randomCharacter.classSkills.map(skill => {
                  return(
                    <ListItem key={skill.id}>
                      <ListItemText>{skill.skill_name}</ListItemText>
                    </ListItem>
                  )
                })}
                {randomCharacter.raceSkills.map(skill => {
                  return(
                    <ListItem key={skill.id}>
                      <ListItemText>{skill.skill_name}</ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>

        {/* Displays randomly generated race information and bonuses attributed to said race */}
        <Grid item xs={8}>
          <Grid container spacing={3}>
            
            <Grid item xs={12}>
              <Typography variant="h4">Race: {randomCharacter.raceInfo.race_name}</Typography>
            </Grid>
            
            <Grid item xs={5}>
              <List>
                <ListItem>
                  <ListItemText><strong>Strength Bonus: </strong>+ {randomCharacter.raceInfo.str_bonus}</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText><strong>Dexterity Bonus: </strong>+ {randomCharacter.raceInfo.dex_bonus}</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText><strong>Constitution Bonus: </strong>+ {randomCharacter.raceInfo.con_bonus}</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText><strong>Intelligence Bonus: </strong>+ {randomCharacter.raceInfo.int_bonus}</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText><strong>Wisdom Bonus: </strong>+ {randomCharacter.raceInfo.wis_bonus}</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText><strong>Charisma Bonus: </strong>+ {randomCharacter.raceInfo.cha_bonus}</ListItemText>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={7}>
              <Typography variant="h5">Speed: {randomCharacter.raceInfo.speed}</Typography>
              <Typography variant="h5">Features:</Typography>
              <List>
                {randomCharacter.raceInfo.race_name === 'Human' ? 
                  <ListItem><ListItemText>Humans don't have any other features</ListItemText></ListItem> :
                  randomCharacter.raceFeatures.map((feature, index) => {
                    return(
                      <ListItem key={index}>
                        <ListItemText><strong>{feature[0]}: </strong>{feature[1]}</ListItemText>
                      </ListItem>
                    );
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>

        {/* Displays randomly generated class information for user */}
        <Grid item xs={12}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h4">Class: {randomCharacter.classInfo.class_name}</Typography>
              <List>
                {randomCharacter.classInfo.class_features.map((feature, index) => {
                  return(
                    <ListItem key={index}>
                      <ListItemText><strong>{feature[0]}: </strong>{feature[1]}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            
            <Grid item>
              <List>
                {randomCharacter.classInfo.spellcasting_ability !== 'None' ? 
                  <>
                    <Typography variant="h5">Spellcasting Ability: {randomCharacter.classInfo.spellcasting_ability}</Typography>
                    <Typography variant="body1">You can add spells for your class from the character sheet.</Typography> 
                  </> :
                  <Typography variant="h5">This class doesn't cast spells.</Typography>
                }        
              </List>
            </Grid>
          </Grid>
        </Grid>

        

        <Grid item align="justify"> 
          <Grid container>
            <Grid item>
              <Typography variant="h4">Background: Acolyte</Typography>
              <Typography variant="body1" paragraph>
                <strong>Shelter of the Faithful</strong>: As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.
                <br/>
                <br/>
                You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple.
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="caption" paragraph>
                The official Dungeons & Dragons SRD only allows the redistribution of the Acolyte background. Talk with your Dungeon Master about other backgrounds you might use that are available within the official Player's Handbook. If you do choose to stick with this background, feel free to add the following equipment: A holy symbol, a prayer book or prayer wheel, 5 sticks of incense, vestments, a set of common clothes, and a belt pouch container 15gp.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} align="center">
          <ButtonGroup variant="contained">
            <Button color="secondary" onClick={cancelCharacterCreator}>Cancel</Button>
            <Button color="primary" onClick={saveCharacter}>
              Save
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
 
  )
} // end CharacterCreatorReview 

export default CharacterCreatorReview;