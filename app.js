// Game Rules: There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

// A game round would look like this...
    // You attack the first alien ship
    // If the ship survives, it attacks you
    // If you survive, you attack the ship again
    // If it survives, it attacks you again
    // Etc.
    // If you destroy the ship, you have the option to attack the next ship or to retreat
    // If you retreat, the game is over, perhaps leaving the game open for further developments or options.
    // You win the game if you destroy all of the aliens.
    // You lose the game if you are destroyed.



// CREATE PLAYER CLASSES
// Extraneous functions

const randomNum = (min, max) => {
    return Math.round(min + Math.random()*(max-min));
}

class EarthShip {
    constructor(name, hull, firepower, accuracy){
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack() {
        if (Math.random() > accuracy) {
            return this.firepower;
        } else {
            return 'miss';
        }
    }
}

class AlienShip {
    constructor(id){
        this.id = id;
        this.hull = randomNum(3,6)
        this.firepower = randomNum(2,4);
        this.accuracy = randomNum(6,8)/10;
    }
    attack() {
        if (Math.random() > accuracy) {
            return this.firepower;
        } else {
            return 'miss';
        }
    }
}

class AlienFleet {
    constructor(fleetSize = 6) {
        this.fleetSize = fleetSize;
        this.fleet = [];
        for(let i = 0; i < this.fleetSize; i++){
            this.fleet.push(this.makeShip(i));
        }
    }

    makeShip(id) {
        const ship = new AlienShip(id);
        return ship;
    }
}


// CREATE GAME CLASS
class Game {
    constructor(){

        // INSTANTIATE PLAYERS
        this.alienFleet = new AlienFleet(6);
        this.earthShip = new EarthShip('UPRW Assembly', 20, 5, .7);
        console.log('%c spacebattle\n', 'font-size: 40px');
        console.log(`Earth is under attack from a fleet of ${this.alienFleet.fleetSize} alien warships! As a last line of defense, the United Peoples Republic of the World has sent the ${this.earthShip.name} into space to fight the alien onslaught...`);
        this.result = undefined;
        this.gameOver = false;

        // START THE GAME
        let alienShipId = 0;
        while(!this.gameOver) {
            this.playRound();
            // User attacks first alien ship
            // Alien attack user (DISPLAY IN CONSOLE)
            // Users attacks alien - alien health falls below 0 (DISPLAY IN CONSOLE)
            // ALERT user they have defeated the first alien AND PROMPT to fight again, or flee (User fight)
            // User selects fight again and repeat
            // (IF) User selectes flee:
                // result = flee
            // (IF)
        }

        // DISPLAY RESULTS
        this.displayGameResult(this.result);
    }

    playRound(){
        this.displayTurn();
        this.checkWin();
    }

    displayTurn(attacker, defender){
        console.log(`Displaying Turn!`);
    }


    promptNextRound(){
    }

    checkWin(){
        this.gameOver = true;
        this.result = 'flee';
    }
    
    displayGameResult(result){
        if(result === 'win'){
            console.log(`--------------------\n\n GAME OVER\n${this.earthShip.name} defeated the Alien Horde! The world is saved!!`)
        } else if(result === 'lose'){
            console.log(`--------------------\n\n GAME OVER\n${this.earthShip.name} was destroyed by the Alien Horde! Earth's destruction is imminent...`);
        } else if(result === 'flee'){
            console.log(`--------------------\n\n GAME OVER\n${this.earthShip.name} fled the battle, saving those on board, but sacrificing the Earth... Earth's destruction is imminent.`);
        } else {
            console.log(`--------------------\n\n GAME OVER\nWhoops! Look like something went wrong and the winner can't be displayed.`)
        }
    }

}

const game = new Game();