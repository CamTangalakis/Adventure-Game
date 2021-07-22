const {Character} = require('./character')

class Enemy {

    constructor(name, startingRoom, health = 5) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.health = health
    }

    actions (action, time){
        setTimeout(action, time);
    }

    takeDamage(damage){
        return this.health -= damage
    }
}

module.exports = {Enemy}


// actions(function(){console.log("The goblin scratches its nose")}, 3000);
// actions(function(){this.currentRoom = Math.floor(Math.random()*5)}, 10000)
