const { expect } = require('chai');

const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {Food} = require("../class/food.js");
const { World } = require("../class/world")

const worldData = require('../data/world-data')


//Cam's goal : create magic items that cause damage to enemies/heal player
//child of item
//player/enemy health system
//items affects health systems

//Lakshmi's goal : create shop to buy/sell items using gold
//child of room
//item values
//gold value system
//shop list / inventory list to buy&sell from

describe()

describe ('Item', function () {
  it('should have items with magical attributes', function(){
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

  it('a rock should exist within the Crossroad', function() {
    let world = new World();
    world.loadWorld(worldData);

    room = world.rooms[1];
    roomItems = room.items;
    expect(roomItems[0].name).to.equal('rock')
  })


});


describe ('Food', function () {


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

  it('a sandwich should exist at the Northern point', function() {
    let world = new World();
    world.loadWorld(worldData);

    room = world.rooms[2];
    roomItems = room.items;
    expect(roomItems[0].name).to.equal('sandwich')
  });


});
