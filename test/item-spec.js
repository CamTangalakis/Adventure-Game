const { expect } = require('chai');

const { Player } = require("../class/player.js");
const { Room } = require("../class/room.js");
const { Item } = require("../class/item.js");
const { Food } = require("../class/food.js");
const { World } = require("../class/world.js")
const { Character } = require("../class/character.js")
const { Enemy } = require("../class/enemy.js")
const { Shop } = require("../class/shop.js")

const worldData = require('../data/world-data')


//Cam's goal : create magic items that cause damage to enemies/heal player
//player/enemy health system
//items affects health systems

//Lakshmi's goal : create shop to buy/sell items using gold
//child of room
//item values
//gold value system
//shop list / inventory list to buy&sell from

describe('Player', function () {
  it('should have health attribute', function () {
    let person = new Player('Link', 'a little green hero');

    expect(person.health).to.equal(10);
  });

  it('can take damage and heal', function () {
    let person = new Player('Link', 'a little green hero');

    expect(person.takeDamage(2)).to.equal(8)
    expect(person.healDamage(2)).to.equal(10) //#was 12
    //#but player took 2 damage on line 34, so health = 8
    //#when player heals 2, health = 8 + 2 = 10
  });

  it('should use magic item', function () {
    let person = new Player('Link', 'a little green hero')
    let item = new Item('potion', 'heals damage', 1, false, true);//#added magic item
    person.useMagicItem(item,'heal', 2)//#added item1; enclosed heal in ''

    expect(person.health).to.equal(12)
  });

  it('should damage enemy when using magic item', function () {
    let person = new Player('Link', 'a little green hero');
    let goblin = new Enemy('ganondorf', 'an evil dude');
    let item = new Item('wand', 'a magic wand', 1, false, true); //#added magic item
    person.useMagicItem(item, 'attack', 2, goblin); //#added item; enclosed attack in ''

    expect(goblin.health).to.equal(3);
  });
});

describe('Item', function () {
  it('should have items with magical attributes', function () {
    let item = new Item('wand', 'a magic wand', 1, false, true);

    expect(item.isMagic).to.equal(true);

  });

  it('should have name and description attributes', function () {
    let item = new Item("rock", "just a simple rock");

    expect(item.name).to.equal("rock");
    expect(item.description).to.equal("just a simple rock");

  });


  it('can be retrieved from player inventory by name', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item);
    expect(player.items.length).to.equal(1);

    expect(player.getItemByName("rock")).to.equal(item);

  });

  it('can be retrieved from a room by name', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");

    room.items.push(item);
    expect(room.items.length).to.equal(1);

    expect(room.getItemByName("rock")).to.equal(item);

  });

  it('can be picked up from a room by a player', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    room.items.push(item);
    expect(room.items.length).to.equal(1);
    expect(player.items.length).to.equal(0);

    player.takeItem("rock");

    expect(room.items.length).to.equal(0);
    expect(player.items.length).to.equal(1);

    expect(player.getItemByName("rock")).to.equal(item);

  });


  it('can be dropped into a room by a player', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item);
    expect(room.items.length).to.equal(0);
    expect(player.items.length).to.equal(1);

    player.dropItem("rock");

    expect(room.items.length).to.equal(1);
    expect(player.items.length).to.equal(0);

    expect(room.getItemByName("rock")).to.equal(item);

  });

  it('a rock should exist within the Crossroad', function () {
    let world = new World();
    world.loadWorld(worldData);

    room = world.rooms[1];
    roomItems = room.items;
    expect(roomItems[0].name).to.equal('rock')
  })


});


describe('Food', function () {


  it('should have name and description attributes', function () {
    let food = new Food("sandwich", "a delicious sandwich");

    expect(food.name).to.equal("sandwich");
    expect(food.description).to.equal("a delicious sandwich");

  });


  it('should be an instance of Item and Food', function () {
    let food = new Food("sandwich", "a delicious sandwich");
    let item = new Item("rock", "just a simple rock");

    expect(food instanceof Item).to.be.true;
    expect(food instanceof Food).to.be.true;

    expect(item instanceof Item).to.be.true;
    expect(item instanceof Food).to.be.false;
  });


  it('can be eaten by a player', function () {
    let food = new Food("sandwich", "a delicious sandwich");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(food);

    expect(player.items.length).to.equal(1);

    player.eatItem("sandwich");

    expect(player.items.length).to.equal(0);

  });


  it('cannot be eaten by a player if not food', function () {
    let item = new Item("rock", "just a simple rock");
    let room = new Room("Test Room", "A test room");
    let player = new Player("player", room);

    player.items.push(item);

    expect(player.items.length).to.equal(1);

    player.eatItem("rock");

    expect(player.items.length).to.equal(1);
  });

  it('a sandwich should exist at the Northern point', function () {
    let world = new World();
    world.loadWorld(worldData);

    room = world.rooms[2];
    roomItems = room.items;
    expect(roomItems[0].name).to.equal('sandwich')
  });


});

//Lakshmi's goal : create shop to buy/sell items using gold
//child of room
//item values
//gold value system
//shop list / inventory list to buy&sell from

//_________________________________________________________________________

//1.the shop has a pre-populated array of items available in the shop
//2.if the player buys an item, it is removed from the array
//3.if the player sells an item, it is included in the array
//4.if the player tries to buy an item that is not avaible in shop, display message 	//"Item currently not available"
//___________________________________________________________________________

//SHOP TEST SPEC

describe('Shop', function () {

  it('should have items in its inventory', function () {
    let newShop = new Shop('shop', 'sells things')
    let itemCount = newShop.items.length;
    let itemsExist = itemCount > 0;

    expect(itemsExist).to.be.true;

  });

  it('should store items in inventory', function () {
    //player should have a function called buyItems
    //should pass in the item to be bought
    //shop should remove new item from inventory
    //new item should be pushed to player's inventory
    let newShop = new Shop('shop', 'sells things')
    let player1 = new Player('Cam');
    let inventory = newShop.items;

    player1.buyItems('map');

    expect(player1.items).to.include('map');
    expect(inventory).to.not.include('map');
  });

  it('should store items in inventory', function () {

    //player should have a function called sellItems
    //should pass in the item to be sold
    //sold item should be removed from player's inventory
    //shop should push new item to inventory
    let newShop = new Shop('shop', 'sells things')
    let player1 = new Player('Cam');
    let inventory = newShop.items;

    player1.sellItems('bag');

    expect(inventory).to.include(['bag']);
    expect(player1.items).to.not.include('bag');
  });

  it('should display error message for unavailable items', function () {

    //player should have a function called buyItems
    //should pass in the item to be bought
    //display error message
    let newShop = new Shop('shop', 'sells things')
    let player1 = new Player('Cam');
    let inventory = newShop.items;

    let result = player1.buyItems('dagger');

    expect(result).to.equal('Item not available');
  });
});
