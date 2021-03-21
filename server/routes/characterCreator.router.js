const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');
const router = express.Router();
const roll = require('../modules/abilityScore-generator');

/**
 * GET /api/characterCreator/generate?playStyle={userPlayStyle}&magicStyle={userMagicStyle}
 * Receives query from client based on user's chosen play and magic styles
 * 
 * randomly generates ability scores and a number for raceId
 */
router.get('/generate', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const playStyleParameters = req.query.playStyle;
  const magicStyleParameters = req.query.magicStyle;

  // The ids of the classes range from 1-9, this will "randomize" a number within that range
  const randomRaceId = Math.floor(Math.random() * 9) + 1;

  // rolls 3 d6 to make each of our ability scores
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
                            classInfo: classInfoResponse.rows[0], 
                            classSkills: classSkillsResponse.rows,
                            raceFeatures: raceFeatureResponse.rows[0].race_features,
                            raceInfo: raceResponse.rows[0], 
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
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('posting')
  const charactersInsertValues = [ 
    req.user.id,
    req.body.characterName,
    req.body.characterStrength,
    req.body.characterDexterity,
    req.body.characterConstitution,
    req.body.characterIntelligence,
    req.body.characterWisdom,
    req.body.characterCharisma,
    req.body.maxHitPoints,
    req.body.characterGender
  ];
  
  const charactersInsertQuery = `
    INSERT INTO "characters" (
      "user_id", 
      "character_name", 
      "str_score", 
      "dex_score",
      "con_score",  
      "int_score", 
      "wis_score",
      "cha_score", 
      "max_hit_points", 
      "gender" 
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING "id";
  `;
  
  const charactersClassesInsertQuery = `
  INSERT INTO "characters_classes" ("character_id", "class_id")
  VALUES ($1, $2);
  `;
  
  const charactersRacesInsertQuery = `
  INSERT INTO "characters_races" ("character_id", "race_id")
  VALUES ($1, $2);
  `;
  
  pool // 1 of 3 DB Queries - INSERT INTO "characters"
    .query(charactersInsertQuery, charactersInsertValues)
    .then(characterInsertResponse => {
      console.log('characterInsertResponse data', characterInsertResponse.rows[0].id);
      
      const charactersClassesInsertValues = [
        characterInsertResponse.rows[0].id,
        req.body.classId
      ];

      pool // 2 of 3 DB Queries - INSERT INTO "characters_classes"
        .query(charactersClassesInsertQuery, charactersClassesInsertValues)
        .then(characterClassesInsertResponse => {
          console.log('characterClassesInsert QUERY SENT');

          const charactersRacesInsertValues = [
            characterInsertResponse.rows[0].id,
            req.body.raceId
          ];

          pool // 3 of 3 DB Queries - INSERT INTO "characters_races"
            .query(charactersRacesInsertQuery, charactersRacesInsertValues)
            .then(characterRacesInsertResponse => {
              console.log('characterRacesInsert QUERY SENT');

              res.sendStatus(201);
            }) // third catch
            .catch(charactersRacesInsertError => {
              console.log(`Error adding raceId ${req.body.raceId} for character ${req.body.characterName}`, charactersRacesInsertError);
            });
        }) // second catch
        .catch(charactersClassesInsertError => {
          console.log(`Error adding classId ${req.body.classId} for character ${req.body.characterName}`, charactersClassesInsertError);

          res.sendStatus(500);
        });
    }) // first catch
    .catch(characterInsertError => {
      console.log(`Error adding ${req.body.characterName} for userId ${req.user.id}`, characterInsertError);

      res.sendStatus(500);
    });
});

module.exports = router;