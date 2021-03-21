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
    WHERE "characters".user_id = $1
    GROUP BY "characters".id, "races".race_name, "classes".class_name
    ORDER BY "characters".id;
  `;

  pool
    .query(selectAllCharactersQuery, [req.user.id])
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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;