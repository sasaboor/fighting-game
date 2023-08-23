/* 
🌟 APP: Fighting Game

Create an updateGame() function that will update the DOM with the state of the game 👇
========================================

- updateGame()

These are the 2 classes you must create and their methods 👇
========================================

class Player {
  - strike()
  - heal()
}

class Game {
  - play()
  - checkIsOver()
  - declareWinner()
  - reset()
}

These functions are hard coded in the HTML. So, you can't change their names.

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 ID 👉 'play' = Button to run simulation
#2 ID 👉 'result' = Div that holds the winner of the match
#3 ID 👉 'p1Name' = Div that holds player 1's Name
#4 ID 👉 'p2Name' = Div that holds player 2's Name
#5 ID 👉 'p1Health' = Div that holds player 1's health
#6 ID 👉 'p2Health' = Div that holds player 2's health
*/

// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1,p2,gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText= p1.name
  p2NameDiv.innerText= p2.name
  p1HealthDiv.innerText= p1.health
  p2HealthDiv.innerText= p2.health

  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if(p1.health <=0 || p2.health <=0){
    game.isOver= true
    gameState= game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver, p1,p2)
    return gameState
  }

}

// ** Create the Player class which can create a player with all it's attributes and methods **
// qazi = new Player('Qazi', 100, 7)
// qazi.name 👉 'Qazi'
// qazi.health 👉 100
// qazi.attackDmg 👉 7
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike (player, enemy, attackDmg) {
    
    // Get random number between 1 - 10 and that is damageAmount
    const num= Math.ceil(Math.random()* attackDmg) 

    // Subtract the enemy health with the damageAmount
    enemy.health -= num

    //  Update the game and DOM with updateGame()
    // player--> p1        enemy--> p2
    // player--> p2        enemy--> p1
    updateGame(p1, p2, game.isOver)

    //  Return a message of 'player name attacks enemy name for damageAmount'
    console.log(`${player.name} attacks ${enemy.name} for ${num} Damage`)

  }
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {
    
    // Get random number between 1 - 5 and store that in hpAmount
    const num= Math.floor(Math.random()*5)

    // Add hpAmount to players health
    if (player.health < 100){
      player.health += num
    }
    

    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver)

    //  Return a message of 'player name heals for hpAmount HP'
    console.log(`${player.name} healed for amount ${num}`)

  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
// game = new Game()
// game.isOver 👉 false
class Game {
  constructor() {
    this.isOver = false; 
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver,p1, p2) {
    
    // Create a message variable that will hold a message based on the condition
    

    // If isOver is true AND p1 health is <= 0 then update message variable  to 'p1 WINS!'
    let message = 'TIE';
    if(isOver== true && p1.health<=0){
        message= `${p2.name} WON!`
        
    } else if(isOver== true && p2.health<=0){
        message= `${p1.name} WON!`
    }

    // Else if isOver is true AND p2 health is <= 0 then update message variable  to 'p2 WINS!'
    // Play victory sound
    document.getElementById('victory').play()

    // Return message variable 
    console.log(message)
    return message

  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1,p2) {
    // set p1 health and p2 health back to 100 and isOver back to false and clear resultDiv.innerText and don't forget to updateGame()
    p1.health=100
    p2.health=100
    this.isOver= false
    resultDiv.innerText= ''
    updateGame(p1,p2,this.isOver)
    console.log("you pressed")
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    if(p1.health>0 && p2.health >0){
      
    }
    this.reset(p1,p2)

    // Make sure the players take turns untill isOver is TRUE
    while (this.isOver== false) {
      //Make sure both players get strike() and heal() once each loop
      p1.strike(p1,p2, p1.attackDmg)
      p1.heal(p1)
      p2.strike(p2,p1, p2.attackDmg)
      p2.heal(p2)
    }
    // Once isOver is TRUE run the declareWinner() method 
    
      return this.declareWinner(this.isOver, p1,p2)
  
  }

}

// ** Create 2 players using the player class **


// ** Save original Player Data into a variable in order to reset **
let p1 = new Player("Saboor", 100, 7)
let p2 = new Player("Player 2", 100, 8);

// ** Create the game object from the Game class **
let game = new Game()

// ** Intialize the game by calling updateGame() **
let gameState = game.isOver;
updateGame(p1,p2, gameState)



// ** Save intial isOver from the game object inside this variable **



// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
playButton.onclick=()=>{
  resultDiv.innerText = game.play(p1,p2)
}


// Add functionality where players can press a button to attack OR heal

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
    if ( e.key=='q' && p2.health >0 && game.isOver== false )
        p1.strike(p1,p2, p1.attackDmg)
    // After striking then play attack sound
    document.getElementById('p1attack').play()

});

document.addEventListener('keydown', function(e) {
  
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if ( e.key=='p' && p1.health >0 && game.isOver== false )
        p2.strike(p2,p1, p2.attackDmg)

    // After healing then play heal sound
    document.getElementById('p2attack').play()

});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if ( e.key=='a' && p2.health >0 && game.isOver== false )
        p1.heal(p1)


    // After striking then play attack sound
    document.getElementById('p1heal').play()

});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if ( e.key=='l' && p1.health >0 && game.isOver== false )
        p2.heal(p2)

    // After healing then play heal sound
    document.getElementById('p2heal').play()


});


//MOBILE CONTROLS
document.getElementById('attack1').addEventListener('click',function(){
  if (  p2.health >0 && game.isOver== false )
        p1.strike(p1,p2, p1.attackDmg)
    // After striking then play attack sound
    document.getElementById('p1attack').play()
})
document.getElementById('attack2').addEventListener('click',function(){
  if ( p1.health >0 && game.isOver== false )
        p2.strike(p2,p1, p2.attackDmg)

    // After healing then play heal sound
    document.getElementById('p2attack').play()
})
document.getElementById('heal1').addEventListener('click', function(){
  if (  p2.health >0 && game.isOver== false )
        p1.heal(p1)


    // After striking then play attack sound
    document.getElementById('p1heal').play()

})
document.getElementById('heal2').addEventListener('click', function(){
  if ( p1.health >0 && game.isOver== false )
        p2.heal(p2)

    // After healing then play heal sound
    document.getElementById('p2heal').play()

})






