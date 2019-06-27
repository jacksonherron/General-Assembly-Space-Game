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
        if (Math.random() < this.accuracy) {
            return this.firepower;
        } else {
            return 0;
        }
    }
}

class AlienShip {
    constructor(id){
        this.id = id;
        this.hull = randomNum(3,6);
        this.firepower = randomNum(2,4);
        this.accuracy = randomNum(6,8)/10;
    }
    attack() {
        if (Math.random() < this.accuracy) {
            return this.firepower;
        } else {
            return 0;
        }
    }
}

class AlienFleet {
    constructor(fleetSize = 20) {
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
        this.alienFleet = new AlienFleet();
        this.earthShip = new EarthShip('UPRW Assembly', 20, 5, .7);
        console.log('%c spacebattle\n', 'font-size: 40px');
        console.log(`Earth is under attack from a fleet of ${this.alienFleet.fleetSize} alien warships! As a last line of defense, the United Peoples Republic of the World has sent the ${this.earthShip.name} into space to fight the alien onslaught...`);
        this.result = undefined;
        this.gameOver = false;
        this.alienId = 0;
        // PLAY GAME
        while(!this.gameOver) {
            this.playRound();
        }
        // DISPLAY RESULTS
        this.displayGameResult(this.result);
    }

    // GAME FUNCTIONS
    playRound(){
        let alienId = this.alienId;
        let alienAttack = null;
        // PLAYER ATTACKS
        let earthAttack = this.earthShip.attack();
        this.alienFleet.fleet[alienId].hull -= earthAttack;
        this.checkWin();
        if (this.gameOver === true) {
            this.displayTurn(earthAttack, alienAttack, alienId);
            return;
        }
        if(this.alienFleet.fleet[alienId].hull > 0){
        // ALIEN ATTACKS
            alienAttack = this.alienFleet.fleet[alienId].attack();
            this.earthShip.hull -= alienAttack;
            this.checkWin();
            if (this.gameOver === true) {
                this.displayTurn(earthAttack, alienAttack, alienId);
                return;
            }
        }
        this.displayTurn(earthAttack, alienAttack, alienId);
        return

    }

    displayTurn(earthAttack, alienAttack, alienId){
        let earthSentence = '';
        let alienSentence = '';
        if(earthAttack !== 0 && this.alienFleet.fleet[alienId].hull !== 0){
            earthSentence = `${this.earthShip.name} hit the alien ship! The attack caused ${earthAttack} damage points. The alien hull health is at ${this.alienFleet.fleet[alienId].hull}.`;
        }
        else if(earthAttack !== 0 && this.alienFleet.fleet[alienId].hull === 0){
            earthSentence =`${this.earthShip.name} hit alien ship ${alienId+1} and the alien ship exploded!`;
        }
        else if(earthAttack === 0){
            earthSentence = `${this.earthShip.name}'s attack missed. The alien hull health is at ${this.alienFleet.fleet[alienId].hull}.`;
        }
        if (alienAttack !== 0 && alienAttack !== null && this.earthShip.hull !== 0){
            alienSentence = `Alien ship ${alienId+1} hit the ${this.earthShip.name}. The attack caused ${alienAttack} damage points. The ${this.earthShip.name}'s hull health is at ${this.earthShip.hull}.`;
        } else if(alienAttack !== 0 && alienAttack !== null && this.earthShip.hull === 0){
            alienSentence = `Alien ship ${alienId+1} hit the ${this.earthShip.name} and it exploded!`
        }
        else if(alienAttack === 0){
            alienSentence = `Alien ship ${alienId+1}'s attack missed. The ${this.earthShip.name}'s hull health is at ${this.earthShip.hull}.`;
        } else if(alienAttack === null) {
            alienSentence = '';
        }
        console.log(earthSentence + '\n' + alienSentence);
        return;
    }

    promptNextRound(){
        let response = undefined;
        while(response !== 'flee' && response !== 'fight'){
            response = prompt(`You destroyed alien ship ${this.alienId}. Would you like to continue the battle or flee? (type "fight" or "flee")`);
        }
        if(response === 'flee'){
            this.result = 'flee';
            this.gameOver = 'true';
        }
            return;
        }
    
    checkWin(){
        if(this.alienFleet.fleet[this.alienId].hull <= 0){
            this.alienFleet.fleet[this.alienId].hull = 0;
            this.alienId += 1;
            if(this.alienId < this.alienFleet.fleetSize){
                this.promptNextRound();
                return;
            } else {
                this.result = 'win';
                this.gameOver = true;
                return;
            }
        }
        if(this.earthShip.hull < 0){
            this.earthShip.hull = 0;
            this.result = 'lose';
            this.gameOver = true;
            return;
        }
        return;
    }

    displayGameResult(result){
        if(result === 'win'){
            console.log(`--------------------\n\n GAME OVER\n${this.earthShip.name} defeated the alien horde! The world is saved!!`)
        } else if(result === 'lose'){
            console.log(`--------------------\n\n GAME OVER\n${this.earthShip.name} was destroyed by the alien horde! Earth's destruction is imminent...`);
        } else if(result === 'flee'){
            console.log(`--------------------\n\n GAME OVER\n${this.earthShip.name} fled the battle, saving those on board, but sacrificing the Earth... Earth's destruction is imminent.`);
        } else {
            console.log(`--------------------\n\n GAME OVER\nWhoops! Look like something went wrong and the winner can't be displayed.`)
        }
        return;
    }

}

const game = new Game();