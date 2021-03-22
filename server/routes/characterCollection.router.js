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

  const selectAllCharacterRaceClass = `
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

    pool
      .query(selectAllCharacterRaceClass, [ userId, characterId ])
      .then(characterRaceClassResponse => {
        console.log(`GET /api/characterCollection/${characterId} SUCCESS`);

        res.send(characterRaceClassResponse.rows);
      }) // first catch
      .catch(error => {
        console.error(`GET /api/characterCollection/${characterId} ERROR`);

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