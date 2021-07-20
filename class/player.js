const { rooms, items } = require('../data/world-data')

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                // console.log(this.items);
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {

        this.items.push(itemName);
        console.log(`You picked up ${itemName}`);

    }

    dropItem(itemName) {
        let index = this.items.indexOf(itemName);

        if (index === -1) {
            console.log(`You do not have ${itemName}`)
        } else {
            this.items.splice(index, 1);
            console.log(`You have dropped ${itemName}`)
        }
    }

    eatItem(itemName) {
        if (itemName.isFood) {
            dropItem(itemName);
            console.log(`You ate ${itemName}.`);
        } else {
            console.log('You cannot eat that');
        }

    }

    getItemByName(name) {
        // loop over items array
        // find item in items array
        // remove from items array
        // return removed item
        let remove;
        let index;

        this.items.forEach((item, i) => {
            if (item === name) {
                remove = name;
                index = i;
            }
        });
        
        this.items.splice(index, 1);

        return remove;
    }
}

module.exports = {
  Player,
};
