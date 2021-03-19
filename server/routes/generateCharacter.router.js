const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');
const router = express.Router();
const roll = require('../modules/abilityScore-generator')

/**
 * GET route template
 */
router.get('/generate', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const playStyleParameters = req.query.playStyle;
  const magicStyleParameters = req.query.magicStyle;

  // The ids of the classes range from 1-9, this will "randomize" a number within that range
  const randomRaceId = Math.floor(Math.random() * 9) + 1;

  // rolls 3 d6 to make our ability scores
  const str_score = roll.abilityScore();
  const dex_score = roll.abilityScore();
  const con_score = roll.abilityScore();
  const int_score = roll.abilityScore();
  const wis_score = roll.abilityScore();
  const cha_score = roll.abilityScore();

  // this will get us back an id number that we can randomize within parameters of user input
  const classIdParameterQuery = `
    SELECT "classes".id FROM "classes"
    WHERE "play_style" = $1 AND "magic_style" = $2;
  `;

  // this will return a random class depending on tha value of randomRaceId
  const raceInfoQuery = `
    SELECT * FROM "races" WHERE "id" = $1;
  `;

  // this will return all class and class feature information to the chosen class
  const classInfoQuery = `
    SELECT "classes".*, 
      ARRAY_AGG(ARRAY["features".feature_name, "features".feature_description]) AS class_features
    FROM "classes"
    JOIN "classes_features"
      ON "classes".id = "classes_features".class_id
    JOIN "features"
      ON "classes_features".feature_id = "features".id
    WHERE "classes".id = $1
    GROUP BY "classes".id;
  `;

  // this will return all of the race features for the chosen race,
  // had to separate from original race query
  const raceFeatures = `
    SELECT 
      ARRAY_AGG(ARRAY["features".feature_name, "features".feature_description]) AS race_features
    FROM "features"
    JOIN "races_features"
      ON "features".id = "races_features".feature_id
    JOIN "races"
      ON "races_features".race_id = "races".id
    WHERE "races".id = $1;
  `; 

  // this will get us class skills
  const classSkills  =`
    SELECT "skills".* FROM "skills"
    JOIN "classes_skills"
      ON "skills".id = "classes_skills".skill_id
    JOIN "classes"
      ON "classes_skills".class_id = "classes".id
    WHERE "classes".id = $1;
  `;

  // this will get us race skills
  const raceSkills= `
    SELECT "skills".* FROM "skills"
    JOIN "races_skills"
      ON "skills".id = "races_skills".skill_id
    JOIN "races"
      ON "races_skills".race_id = "races".id
    WHERE "races".id = $1;  
  `;

  // first query to get back classes that fit the description
  pool
    .query(classIdParameterQuery, [ playStyleParameters, magicStyleParameters ])
    .then(classIdResponse => {
      console.log(
        `GET /api/generateCharacter/${playStyleParameters}/${magicStyleParameters} RESPONSE:`, 
        classIdResponse.rows
      );

      // Randomizes the class that we get back within the parameters
      const randomClassId = classIdResponse.rows[
        Math.floor(Math.random() * classIdResponse.rows.length)
      ].id;
      
      pool // second query to get back random race info
        .query(raceInfoQuery, [randomRaceId])
        .then(raceResponse => {
          console.log('Fetching race data related to id:', randomRaceId);          

          pool // third query to get back class information now that class has been chosen
            .query(classInfoQuery, [randomClassId])
            .then(classInfoResponse => {
              console.log('Fetching class data related to id:', randomClassId);

              pool // fourth query to get back raceFeatures
                .query(raceFeatures, [randomRaceId])
                .then(raceFeatureResponse => {
                  console.log('Fetching race features for race id:', randomRaceId);

                  pool // fifth query
                    .query(classSkills, [randomClassId])
                    .then(classSkillsResponse => {
                      console.log('Fetching class skills data related to id:', randomClassId);
                      
                      pool // sixth query
                        .query(raceSkills, [randomRaceId])
                        .then(raceSkillResponse => {
                          console.log('Fetching race skills for race id:', randomRaceId);

                          res.send({
                            classInfo: classInfoResponse.rows, 
                            classSkills: classSkillsResponse.rows,
                            raceFeatures: raceFeatureResponse.rows,
                            raceInfo: raceResponse.rows, 
                            raceSkills: raceSkillResponse.rows,
                            str_score,
                            dex_score,
                            con_score,
                            int_score,
                            wis_score,
                            cha_score
                          });
                        })
                        // sixth catch
                        .catch(raceSkillsError => {
                          console.log(`Error using race id ${randomRaceId} to get race features`, raceFeatureError);

                          res.sendStatus(500);
                        })
                    })
                    // fifth catch
                    .catch(classSkillsError => {
                      console.log(`Error using class id ${randomClassId} to get class skills info`, classSkillsError);
                      
                      res.sendStatus(500);
                    })
                })
                // fourth catch
                .catch(raceFeatureError => {
                  console.log(`Error using race id ${randomRaceId} to get race features`, raceFeatureError);
                  
                  res.sendStatus(500);
                })
            })
            // third catch
            .catch(classError => {
              console.log(`Error using class id ${randomClassId} to get class info`, classError);

              res.sendStatus(500);
            })
          })
        // second catch for race
        .catch(raceError => {
          console.log(`Error using race id ${randomRaceId} to get race info`, raceError);

          res.sendStatus(500);
        })      
    })
    // first catch 
    .catch(err => {
      console.error(`GET /api/generateCharacter/${playStyleParameters}/${magicStyleParameters} ERROR:`, err);
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
