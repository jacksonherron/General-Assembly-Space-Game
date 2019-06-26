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



// Step 1 - Create classes and objects for EarthShip and AlienFleet
class EarthShip {
    constructor(name, hull, firepower, accuracy){
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack() {
        return this.firepower;  
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
        return this.firepower;
    }
}

class AlienFleet {
    constructor(fleetSize) {
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


const earthShip = new EarthShip('USS Assembly', 20, 5, .7);
console.table(earthShip)

const alienFleet = new AlienFleet(6);
console.table(alienFleet);









const randomNum = (min, max) => {
    return (Math.round((min + Math.random() * (max-min))));
}
