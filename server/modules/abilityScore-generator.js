function rollD6(){
    let roll = Math.floor(Math.random() * 6) + 1;
    console.log('roll is:', roll);
    return roll;
} 
function abilityScore() {
	let score = rollD6() + rollD6() + rollD6();
  return score;
}


module.exports = { abilityScore };