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
router.get('/information/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const fetchCharacterData = 'SELECT * FROM "characters" WHERE "user_id" = $1 AND "id" = $2;'

  pool
    .query(fetchCharacterData, [req.user.id, req.params.id])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(error => {
      console.log('Error Getting character information to edit', error);

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
