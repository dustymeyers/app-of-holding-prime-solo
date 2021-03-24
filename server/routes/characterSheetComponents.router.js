const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET character sheet skills and saving throws lists
 */
router.get('/main', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const skillsListQuery = 'SELECT * FROM "skills";';
  const savingThrowsListQuery = 'SELECT * FROM "saving_throws";';

  pool // 1 of 2 DB queries: SELECT * FROM "skills";
    .query(skillsListQuery)
    .then(skillsListResponse => {
      const skillsList = skillsListResponse.rows;

      pool // 2 of 2 DB queries: SELECT * FROM "saving_throws";
        .query(savingThrowsListQuery)
        .then(savingThrowsResponse => {
          const savingThrowsList = savingThrowsResponse.rows;
          
          res.send({skillsList, savingThrowsList});
        })
        .catch(savingThrowsError => {
          console.log('Error with GET saving throws', savingThrowsError);

          res.sendStatus(500);
        })
    }) // first catch
    .catch(skillsError => {
      console.log('Error with GET skills', skillsError);

      res.sendStatus(500);
    });
});
/**
 * GET all equipment for add equipment component.
 */
router.get('/equipment', rejectUnauthenticated, (req, res) => {
  const allEquipmentQuery = 'SELECT * FROM "equipment"';

  pool
    .query(allEquipmentQuery)
    .then(equipmentListResponse => {
      res.send(equipmentListResponse.rows);
    })
    .catch(error => {
      console.log('Error getting all equipment list');

      res.sendStatus(500);
    });
}); 

module.exports = router;