function rollD6(){
  let roll = Math.floor(Math.random() * 6) + 1;

  console.log('roll is:', roll);

  return roll;
} // end rollD6

// // https://www.tutorialspoint.com/remove-smallest-number-in-array-javascript
// // Credit for this code goes to AmitDiwan, published on tutorialspoint on October 9th, 2020

// // searches through an array of numbers, removing the lowest random d6 roll out of 4
const chosenAbilityScoreRoll = arr => {
  const smallestCreds = arr.reduce((acc, val, index) => {
    let { num, ind } = acc;

    if (val >= num) {
      return acc;
    };
    
    ind = index;
    num = val;
    return { ind, num };
  }, {
    num: Infinity,
    ind: -1
  });
  const { ind } = smallestCreds;

  if (ind === -1) {
      return;
  };

  arr.splice(ind, 1);
}; // end chosenAbilityScore

function addDice(arr) {
  let score = 0;

  for (let num of arr) {
    score += num;
  }

  return score;
} // end addDice

function abilityScore() {
  const naturalAbilityScoreRoll = [ rollD6(), rollD6(), rollD6(), rollD6() ];

  chosenAbilityScoreRoll(naturalAbilityScoreRoll);
  console.log('this is what we get', naturalAbilityScoreRoll);
  
  return addDice(naturalAbilityScoreRoll);
} // end abilityScore


// console.log('concatenated:', abilityScore);

module.exports = { abilityScore };