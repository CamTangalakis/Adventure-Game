const { Room } = require('./room')
const { Player } = require('./player')
const { buyItems, sellItems } = require('./player')

class Shop {
    constructor(name, description, exits = {}, items = ['map', 'clothes', 'bag']) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.items = items;
    }

    buyItems(item) {
        this.items.push(item);
    }

    sellItems(item) {
        if (this.items.includes(item)) this.getItemByName(item)
        else console.log('Item not available')
    }

    getItemByName(name) {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.name === name) {
                return this.items.splice(i, 1)[0];
            }
        }
    }

}

module.exports = { Shop }
