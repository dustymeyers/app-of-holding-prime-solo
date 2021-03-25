const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');
const router = express.Router();

function insertSerializer(array) {	
  let pgTemplateNum = 1;
  let serialInsert = '';

  for (let i = 0; i < array.length; i++) {
    if (array.length - 1 === i ) {
      pgTemplateNum ++;

      serialInsert += `($1 , $${pgTemplateNum});`;
    } else {
      pgTemplateNum ++;

      serialInsert += `($1 , $${pgTemplateNum}), `;
    }    
  } // end for
  return serialInsert;
} // end insertSerializer

function pgSerializer(array, characterId) {
  let pgInsert = [characterId];
  for (let i = 0; i < array.length; i++) {
    pgInsert.push(array[i].id);
  }
  return pgInsert;
} 

/**
 * GET 
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

/**
 * GET 
 * Returns single user specific character
 */
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
    SELECT "skills".* FROM "skills"
    JOIN "characters_skills"
      ON "skills".id = "characters_skills".skill_id
    WHERE "characters_skills".character_id = $1
    ORDER BY "skills".id;  
  `;

  // DB query, will return specific saving throw proficiencies for user character's class and race
  const selectAllSavingThrowsQuery = `
    SELECT "saving_throws".* FROM "saving_throws"
    JOIN "characters_savingThrows"
      ON "saving_throws".id = "characters_savingThrows"."savingThrow_id"
    WHERE "characters_savingThrows".character_id = $1
    ORDER BY "saving_throws".id;
  `;

  const selectAllLanguagesQuery = `
    SELECT "languages".* FROM "languages"
    JOIN "characters_languages"
      ON "languages".id = "characters_languages".language_id
    WHERE "characters_languages".character_id = $1
    ORDER BY "languages".id;
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
          
          pool // Third query to get back all skill proficiencies for character
            .query(selectAllSkillsQuery, [characterId])
            .then(selectAllSkillsResponse => {

              pool // Fourth query to get back all saving throw proficiencies for character
                .query(selectAllSavingThrowsQuery, [characterId])
                .then(selectAllSavingThrowsResponse => {
                  
                  pool // Fifth query to get back all languages known to character
                    .query(selectAllLanguagesQuery, [characterId])
                    .then(selectAllLanguagesResponse => {

                      res.send({
                        baseInformation: characterRaceClassResponse.rows[0],
                        features: selectAllFeaturesResponse.rows,
                        skillProficiencies: selectAllSkillsResponse.rows,
                        savingThrowProficiencies: selectAllSavingThrowsResponse.rows,
                        languagesKnown: selectAllLanguagesResponse.rows
                      });
                    }) // fifth catch
                    .catch(languagesError => {
                      console.error(`GET /api/characterCollection/${characterId} ERROR`, languagesError);

                      res.sendStatus(500);
                    })
                }) // fourth catch
                .catch(savingThrowsError => {
                  console.error(`GET /api/characterCollection/${characterId} ERROR`, savingThrowsError);

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
 * DELETE 
 * Deletes single user specific character
 */
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const characterId = req.params.id;
  const userId = req.user.id;

  console.log('Attempting to delete character at id:', characterId);

  const deleteCharacterQuery = `
    DELETE FROM "characters"
    WHERE "id" = $1 AND "user_id" = $2;
  `;

  pool
    .query(deleteCharacterQuery, [characterId, userId])
    .then(dbResponse => {
      console.log('Deleted character at:', characterId);

      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error deleting character with id: ${characterId}.`, error);

      res.sendStatus(500);
    });
});

/**
 * PUT
 * Updates information from character sheet stored on characters table
 */
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  console.log(`PUT /characterCollection/edit/${req.params.id}`)

  const editPgTemplate = [
    req.body.baseInformation.character_name,
    req.body.baseInformation.level,
    req.body.baseInformation.str_score,
    req.body.baseInformation.dex_score,
    req.body.baseInformation.con_score,
    req.body.baseInformation.int_score,
    req.body.baseInformation.wis_score,
    req.body.baseInformation.cha_score,
    req.body.baseInformation.hit_dice_available,
    req.body.baseInformation.current_hit_points,
    req.body.baseInformation.max_hit_points,
    req.body.baseInformation.temporary_hit_points,
    req.body.baseInformation.cp_total,
    req.body.baseInformation.sp_total,
    req.body.baseInformation.ep_total,
    req.body.baseInformation.gp_total,
    req.body.baseInformation.pp_total,
    req.body.baseInformation.experience_points,
    req.body.baseInformation.alignment,
    req.body.baseInformation.gender,
    req.user.id,
    req.params.id
  ];

  const editCharacterQuery = `
    UPDATE "characters"
    SET
      "character_name" = $1,
      "level" = $2,
      "str_score" = $3,
      "dex_score" = $4,
      "con_score" = $5,
      "int_score" = $6,
      "wis_score" = $7,
      "cha_score" = $8,
      "hit_dice_available" = $9,
      "current_hit_points" = $10,
      "max_hit_points" = $11,
      "temporary_hit_points" = $12,
      "cp_total" = $13,
      "sp_total" = $14,
      "ep_total" = $15,
      "gp_total" = $16,
      "pp_total" = $17,
      "experience_points" = $18,
      "alignment" = $19,
      "gender" = $20
    WHERE "user_id" = $21 AND "id" = $22;
  `;

  pool
    .query(editCharacterQuery, editPgTemplate)
    .then(dbRes => {
      console.log(`Character id ${req.params.id} updated`);

      res.sendStatus(204);
    })
    .catch(error => {
      console.log(`Error updating character id ${req.params.id}`);

      res.sendStatus(500);
    })
})

/**
 * POST
 * Adds equipment to character sheet
 */
router.post('/equipment/:characterId', rejectUnauthenticated, (req, res) => {
  console.log(`POST /api/characterCollection/equipment/${req.params.characterId} adding:`, req.body);
  
  const pgEquipmentArray = pgSerializer(req.body, req.params.characterId);

  const insertEquipmentQuery = `
    INSERT INTO "characters_equipment" ("character_id", "equipment_id")
    VALUES ${insertSerializer(req.body)}
  `;

  pool 
    .query(insertEquipmentQuery, pgEquipmentArray)
    .then(dbRes => {
      console.log('Added equipment successfully!');

      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Error adding equipment to character sheet', error);

      res.sendStatus(500);
    })
})

/**
 * GET
 * Get all character specific equipment
 */
router.get('/equipment/:characterId', rejectUnauthenticated, (req, res) => {
  console.log(`GET /api/characterCollection/equipment/${req.params.characterId} for user`, req.user.id);
  
  const characterEquipmentQuery = `
    SELECT "equipment".*, "characters_equipment".qty FROM "equipment"
    JOIN "characters_equipment"
      ON "equipment".id = "characters_equipment".equipment_id
    JOIN "characters"
      ON "characters".id = "characters_equipment".character_id
    WHERE "characters".id = $1 and "characters".user_id = $2;
  `;

  pool
    .query(characterEquipmentQuery, [req.params.characterId, req.user.id])
    .then(characterEquipmentResponse => {
      res.send(characterEquipmentResponse.rows);
    })
    .catch(error => {
      console.log('Error getting character equipment', error);

      res.sendStatus(500);
    })
});

/**
 * POST
 * Adds spells to character sheet
 */
router.post('/spells/:characterId', rejectUnauthenticated, (req,res) => {
  console.log(`POST /api/characterCollection/spells/${req.params.characterId} adding:`, req.body);

  const pgSpellsArray = pgSerializer(req.body, req.params.characterId);

  const insertSpellsQuery = `
    INSERT INTO "characters_spells" ("character_id", "spell_id")
    VALUES ${insertSerializer(req.body)}
  `;

  pool
    .query(insertSpellsQuery, pgSpellsArray)
    .then(dbRes => {
      console.log('Added spells successfully!')
      
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Error adding spells to character sheet', error);

      res.sendStatus(500);
    })
}); 

/**
 * GET
 * Get all character specific spells
 */
router.get('/spells/:characterId', rejectUnauthenticated, (req, res) => {
  console.log(`GET /api/characterCollection/spells/${req.params.characterId} for user`, req.user.id);

  const characterSpellsQuery = `
    SELECT "spells".* FROM "spells"
    JOIN "characters_spells"
      ON "spells".id = "characters_spells".spell_id
    JOIN "characters"
      ON "characters_spells".character_id = "characters".id
    WHERE "characters".id = $1 AND "characters".user_id = $2;
  `;

  pool
    .query(characterSpellsQuery, [req.params.characterId, req.user.id])
    .then(characterSpellsResponse => {
      res.send(characterSpellsResponse.rows);
    })
    .catch(error => {
      console.log('Error getting character spells', error);

      res.sendStatus(500);
    });
})

/**
 * PUT
 * Update equipment qty
 */
router.put('/equipment/updateQty', rejectUnauthenticated, (req, res) =>{
  const updateQtyQuery = `
    UPDATE "characters_equipment" SET "qty" = $1
    WHERE "character_id" = $2 AND "equipment_id" = $3;
  `;

  pool
    .query(updateQtyQuery, [req.body.qty, req.body.characterId, req.body.equipment_id])
    .then(dbRes => {
      console.log('QTY UPDATED FOR ITEM NUMBER', req.body.equipment_id);

      res.sendStatus(200);
    })
    .catch(error => {
      console.log('ERROR UPDATING ITEM QTY', error);
      
      res.sendStatus(500);
    })

})

router.delete('/equipment/remove/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete equipment', req.body);
  const deleteEquipmentQuery = `
    DELETE FROM "characters_equipment"
    WHERE "character_id" = $1 AND "equipment_id" = $2;	
  `;

  pool
    .query(deleteEquipmentQuery, [req.query.characterId, req.params.id])
    .then(dbRes => res.sendStatus(200))
    .catch(error => {
      console.log('Error deleting equipment', error);

      res.sendStatus(500);
    })
})
module.exports = router;