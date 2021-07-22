const { Player } = require('./player')

class Item {
  constructor(name, description, room, isFood, isMagic) {
    this.name = name;
    this.description = description;
    this.room = room;
    this.isFood = isFood;
    this.isMagic = isMagic;
  }
}

// const knife = new Item(
//   'knife',
//   'can attack',
//   '1',
//   'false'
// );


module.exports = {
  Item,
};
