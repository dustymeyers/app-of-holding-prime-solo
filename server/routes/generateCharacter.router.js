const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:playStyle/:magicStyle', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const playStyleParameters = req.params.playStyle;
  const magicStyleParameters = req.params.magicStyle;

  /**
   * This is what our Class Parameter query will look like:
   * 
   * SELECT 
   *    "classes".id,
   *    "classes".class_name
   * FROM "classes"
   * JOIN "classes_features"
   *    ON "classes".id = "classes_features".class_id
   * JOIN "features"
   *    ON "classes_features".feature_id = "features".id
   * WHERE "play_style" = 'hackAndSlash' AND "magic_style" = 'noMagic'
   * GROUP BY "classes".id; 
   */

  const classParameterQuery = `
    SELECT 
      "classes".id,
      "classes".class_name
    FROM "classes"
    JOIN "classes_features"
      ON "classes".id = "classes_features".class_id
    JOIN "features"
      ON "classes_features".feature_id = "features".id
    WHERE "play_style" = $1 AND "magic_style" = $2
    GROUP BY "classes".id;`;

  // first query to get back classes that fit the description
  pool
    .query(classParameterQuery, [ playStyleParameters, magicStyleParameters ])
    .then(dbRes => {
      console.log(`GET /api/generateCharacter/${playStyleParameters}/${magicStyleParameters} RESPONSE:`, dbRes.rows);



      res.send(dbRes.rows[Math.floor(Math.random() * dbRes.rows.length)]);
    })
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
