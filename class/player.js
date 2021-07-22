// const { rooms, items } = require('../data/world-data')
const { Food } = require('./food');
const { Room } = require('./room');
const { Character } = require('./character')
const {Item} = require('./item');
const {Shop} = require('./shop');
const {buyItems, sellItems} = require('./shop');
const {Enemy} = require('./enemy'); //#imported enemy module
// const {addItem, removeItem} = require('./room');

class Player {

    constructor(name, startingRoom, health = 10) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
        this.health = health;
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
            for (let i = 0; i < this.items.length; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        let item = this.currentRoom.getItemByName(itemName);
        let index = this.items.indexOf(itemName);
        if (item) {
            this.items.push(item);
            // this.removeItem(item);
            console.log(`You picked up ${itemName}`);
            // console.log(this.items);
        }
    }

    dropItem(itemName) {
        let item = this.currentRoom.getItemByName(itemName);
        let index = this.items.indexOf(itemName);

        if (this.items.length === 0) {
            console.log(`You do not have ${itemName}`)
        } else {
            this.items.splice(index, 1);
            // this.addItem(item);
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
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.name === name) {
                return this.items.splice(i, 1)[0];
            }
        }
    }

    takeDamage(damage) {
        return this.health -= damage;
    }

    healDamage(heal) {
        return this.health += heal;
    }

    attackEnemy(damage, enemy) {
        return enemy.takeDamage(damage); //#
    }

    useMagicItem(item, action, damage, enemy) { //#added item
        if (item.isMagic) {
            if (action === 'heal') return this.healDamage(damage);
            else if (action === 'attack') return this.attackEnemy(damage, enemy)
        }
    }

    //create instance of shop methods
    buyItems(item){
        let shopSells = new Shop('magic shop', 'sells magic things')
        this.items.push(item);
        shopSells.sellItems(item);
    }

    sellItems(item){
        let shopBuys = new Shop('magic shop', 'sells magic things')
        this.getItemByName(item);
        shopBuys.buyItems(item);
    }
}

module.exports = {
    Player,
};
