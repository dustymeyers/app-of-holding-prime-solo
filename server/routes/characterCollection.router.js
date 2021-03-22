const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template 
 * Returns full list of user specific characters 
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(`GET ALL CHARACTERS WHERE DEAD = ${req.query.dead}`);

  const selectAllCharactersQuery = `
    SELECT 
      "characters".id,
      "characters".character_name,
      "characters".level,
      "races".race_name,
      "classes".class_name	
    FROM "races"
    JOIN "characters_races"
      ON "races".id = "characters_races".race_id
    JOIN "characters"
      ON "characters_races".character_id = "characters".id
    JOIN "characters_classes"
      ON "characters".id = "characters_classes".character_id
    JOIN "classes"
      ON "characters_classes".class_id = "classes".id
    WHERE "characters".user_id = $1 AND "characters".dead = $2
    GROUP BY "characters".id, "races".race_name, "classes".class_name
    ORDER BY "characters".id;
  `;

  pool
    .query(selectAllCharactersQuery, [req.user.id, req.query.dead])
    .then(allCharactersResponse => {
      console.log('selectAllCharacters successfully queried');

      res.send(allCharactersResponse.rows);
    })
    .catch(error => {
      console.log('Error at GET /api/characterCollection/', error);
      
      res.sendStatus(500)
    });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('GET character with id:', req.params.id);

  const userId = req.user.id;
  const characterId = req.params.id;

  // DB query, will return specific user character info along with respective class and race info
  const selectAllCharacterRaceClassQuery = `
    SELECT 
      "classes".id as "class_id",
      "classes".class_name,
      "classes".hit_die,
      "classes".spellcasting_ability,
      "characters".*,
      "races".id as "race_id",
      "races".race_name,
      "races".str_bonus,
      "races".dex_bonus,
      "races".con_bonus,
      "races".int_bonus,
      "races".wis_bonus,
      "races".cha_bonus,
      "races".speed
    FROM "classes"
    JOIN "characters_classes"
      ON "classes".id = "characters_classes".class_id
    JOIN "characters"
      ON "characters_classes".character_id = "characters".id
    JOIN "characters_races"
      ON "characters".id = "characters_races".character_id
    JOIN "races"
      ON "characters_races".race_id = "races".id
    WHERE "characters".user_id = $1 AND "characters".id = $2;
  `;

  // DB query, will return specific features for user character's class and race
  const selectAllFeaturesQuery = `
    SELECT 
      "features".feature_name, 
      "features".feature_description FROM "classes_features"
    RIGHT OUTER JOIN "features"
      ON "classes_features".feature_id = "features".id
    LEFT OUTER JOIN "races_features"
      ON "features".id = "races_features".feature_id
    WHERE "classes_features".class_id = $1 OR "races_features".race_id = $2
    ORDER BY "features".id;
  `;

  // DB query, will return specific skill proficiencies for user character's class and race
  const selectAllSkillsQuery = `
    SELECT "skills".* FROM "classes_skills"
    RIGHT OUTER JOIN "skills"
      ON "classes_skills".skill_id = "skills".id
    LEFT OUTER JOIN "races_skills"
      ON "skills".id = "races_skills".skill_id
    WHERE "classes_skills".class_id = $1 OR "races_skills".race_id = $2
    ORDER BY "skills".id;
  `;

  // DB query, will return specific saving throw proficiencies for user character's class and race
  const selectAllSavingThrowsQuery = `
    SELECT "saving_throws".* FROM "saving_throws"
    JOIN "classes_savingThrows" 
      ON "saving_throws".id = "classes_savingThrows"."savingThrow_id"
    WHERE "classes_savingThrows".class_id = $1
    ORDER BY "saving_throws".id;
  `;

  pool // First query to get back all base character, race, and class information
    .query(selectAllCharacterRaceClassQuery, [userId, characterId])
    .then(characterRaceClassResponse => {
      const classId = characterRaceClassResponse.rows[0].class_id;
      const raceId = characterRaceClassResponse.rows[0].race_id;
      console.log(`FETCHING class ${classId} and raceId ${raceId}`);
      
      pool // Second query to get back all features for class and race
        .query(selectAllFeaturesQuery, [classId, raceId])
        .then(selectAllFeaturesResponse => {
          console.log(`GET /api/characterCollection/${characterId} SUCCESS`);
          
          pool // Third query to get back all skill proficiencies for class and race
            .query(selectAllSkillsQuery, [classId, raceId])
            .then(selectAllSkillsResponse => {

              pool // Fourth query to get back all saving throw proficiencies for class
                .query (selectAllSavingThrowsQuery, [classId])
                .then(selectAllSavingThrowsResponse => {
                  
                  res.send({
                    baseInformation: characterRaceClassResponse.rows[0],
                    features: selectAllFeaturesResponse.rows,
                    skillProficiencies: selectAllSkillsResponse.rows,
                    savingThrowProficiencies: selectAllSavingThrowsResponse.rows,
                  });
                })
                .catch(savingThrowsError => {
                  console.error(`GET /api/characterCollection/${characterId} ERROR`, skillsError);

                  res.sendStatus(500);
                })
            }) // third catch
            .catch(skillsError => {
              console.error(`GET /api/characterCollection/${characterId} ERROR`, skillsError);

              res.sendStatus(500);
            });
        }) // second catch
        .catch(featuresError => {
          console.error(`GET /api/characterCollection/${characterId} ERROR`, featuresError);

          res.sendStatus(500);
        })
    }) // first catch
    .catch(error => {
      console.error(`GET /api/characterCollection/${characterId} ERROR`, error);

      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;