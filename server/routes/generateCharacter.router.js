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

  // The ids of the classes range from 1-9, this will "randomize" a number within that range
  const randomRaceId = Math.floor(Math.random() * 9) + 1;

  /**
   * This is what our Class Parameter query will look like:
   * 
   * SELECT "classes".id FROM "classes"
   * WHERE "play_style" = 'hackAndSlash' AND "magic_style" = 'noMagic';
   * 
   * 
   * 
   * 
   *  DEPRECATED FOR NOW
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

              res.send({classInfo: classInfoResponse.rows, raceInfo: raceResponse.rows});
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
