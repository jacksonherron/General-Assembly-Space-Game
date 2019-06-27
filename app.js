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

/*
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
    constructor(fleetSize = 12) {
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
        console.log(`%c Earth is under attack from a fleet of ${this.alienFleet.fleetSize} alien warships! As a last line of defense, the United Peoples Republic of the World has sent the ${this.earthShip.name} into space to fight the alien onslaught...\n`, 'line-height: 1.5');
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
        let style = ``;
        if(earthAttack !== 0 && this.alienFleet.fleet[alienId].hull !== 0){
            earthSentence = `${this.earthShip.name} hit the alien ship! The attack caused ${earthAttack} damage points. The alien hull health is at ${this.alienFleet.fleet[alienId].hull}.`;
        }
        else if(earthAttack !== 0 && this.alienFleet.fleet[alienId].hull === 0){
            earthSentence =`%c ${this.earthShip.name} hit alien ship ${alienId+1} and the alien ship exploded!`;
            style = `color: lightblue`;
        }
        else if(earthAttack === 0){
            earthSentence = `${this.earthShip.name}'s attack missed. The alien hull health is at ${this.alienFleet.fleet[alienId].hull}.`;
        }
        if (alienAttack !== 0 && alienAttack !== null && this.earthShip.hull !== 0){
            alienSentence = `Alien ship ${alienId+1} hit the ${this.earthShip.name}. The attack caused ${alienAttack} damage points. The ${this.earthShip.name}'s hull health is at ${this.earthShip.hull}.`;
        } else if(alienAttack !== 0 && alienAttack !== null && this.earthShip.hull === 0){
            alienSentence = `%c Alien ship ${alienId+1} hit the ${this.earthShip.name} and it exploded!`
            style = `color: red`;
        }
        else if(alienAttack === 0){
            alienSentence = `Alien ship ${alienId+1}'s attack missed. The ${this.earthShip.name}'s hull health is at ${this.earthShip.hull}.`;
        } else if(alienAttack === null) {
            alienSentence = '';
        }
        console.log('%c ' + earthSentence + '\n' + alienSentence, style);
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
            console.log(`--------------------\n\n GAME OVER\n\n--------------------`);
            console.log(`%c${this.earthShip.name} defeated the alien horde! The world is saved!!`, 'color: green');
        } else if(result === 'lose'){
            console.log(`--------------------\n\n GAME OVER\n\n--------------------`);
            console.log(`%c${this.earthShip.name} was destroyed by the alien horde! Earth's destruction is imminent...`, 'color: red');
        } else if(result === 'flee'){
            console.log(`--------------------\n\n GAME OVER\n\n--------------------`);
            console.log(`%c ${this.earthShip.name} fled the battle, saving those on board, but sacrificing the Earth... Earth's destruction is imminent.`, 'color: red');
        } else {
            console.log(`--------------------\n\n GAME OVER\n\n--------------------`);
            console.log(`Whoops! Look like something went wrong and the winner can't be displayed.`)
        }
        return;
    }

}

const game = new Game();
*/






// REPEAT THE EXCERCISE AS A CODE ALONG

// Create Ship class!!
class Ship {
    constructor(shipConfig) {
        this.name = shipConfig.name;
        this.hull = shipConfig.hull;
        this.firePower = shipConfig.firePower;
        this.accuracy = shipConfig.accuracy;
    }

    static randomNumber(min, max, isDecimal){
        if(isDecimal){
            return parseFloat((min + Math.random()*(max-min)).toFixed(1));
        } else{
            return Math.floor(Math.random() * (max - min) + min);
        }
    }

    static getRandomAlienConfig(alienId) {
        return {
            name: alienId,
            hull : Ship.randomNumber(3,6),
            firePower: Ship.randomNumber(2,4),
            accuracy: Ship.randomNumber(.6, .8, true),
        }
    }
}


// Create Game class!!
class Game {
    constructor(numberOfAliens) {
        this.numberOfAliens = numberOfAliens;
        this.ships = {
            ussAssembly: new Ship({
                name: 'USS Assembly',
                hull: 20,
                firePower: 5,
                accuracy: .7
            }),
            aliens: [],
            alien: {},
        }
    }

    selectAlienTarget() {
        return this.ships.aliens.shift();
    }

    attack(operator, mark) {
        if (Math.random() < operator.accuracy) {
            mark.hull -= operator.firePower;
            return `Direct hit!`;
        } else {
            return 'Miss...';
        }
    }

    battle() {
        let {alien, ussAssembly} = this.ships;

        while(alien && ussAssembly.hull > 0 ){
            let operator = ussAssembly;
            let mark = alien;
            console.log('Attack...!');
            const result = this.attack(operator, mark);
            console.log(result);
            console.log(`Alien ${mark.name + 1} ship hull = ${mark.hull}`);
            if (mark.hull > 0) {
                operator = alien;
                mark = ussAssembly;
                console.log(`Alien ${operator.name + 1} count-attacks ${mark.name}`);
                const result = this.attack(operator, mark);
                console.log(result);
                console.log(`${mark.name} ship hull = ${mark.hull}`);

            } else {
                console.log(`${operator.name} destroyed Alien ${mark.name+1}`);
                alien = this.selectAlienTarget();
                alien ? console.log(`New Alien target selected...`): null;
            }
        }
        if (this.ships.ussAssembly.hull > 0) {
            console.log(`VICTORY!! You defeated all ${this.numberOfAliens} Aliens!`);
        } else {
            console.log(`DEFEAT. ${this.ships.ussAssembly.name} exploded! Earth's destruction is imminent...`);
        }
    }

    init() {
        console.log('...Initializing game...');
        for(let i = 0; i < this.numberOfAliens; i++ ){
            let alien = new Ship(Ship.getRandomAlienConfig(i));
            this.ships.aliens.push(alien);
        }
        this.ships.alien = this.selectAlienTarget();
        console.log('First alien target sighted...');
        this.battle();

    }
}

const game = new Game(20);
game.init();

