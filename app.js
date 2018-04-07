var game = new Phaser.Game(window.innerWidth, window.innerHeight - 20, Phaser.arcade, '', { preload: preload, create: create, update: update });

var player;
// var cursors;
var cheese, pepperoni, mushroom, basil, onion, pepper;
var cursors;
var toppings;
var menu;
var menuText;
var menuIngredients = "";
var level = 1;
var menuIngredientsArray = [];
var pizzaArray = [];
var nextLevelText;
var emitter;



function preload () {
    game.load.image('redwhite', 'images/redwhite.jpg');
    game.load.image('chef', 'images/chef.png');
    game.load.image('basil', 'images/basil.png');
    game.load.image('cheese', 'images/cheese.png');
    game.load.image('mushroom', 'images/mushroom.png');
    game.load.image('olives', 'images/olives.png');
    game.load.image('onion', 'images/onion.png');
    game.load.image('pepper', 'images/pepper.png');
    game.load.image('pepperoni', 'images/pepperoni.png');
}

function clearMenu () {
    menuIngredientsArray = [];
    menuIngredients = "";
}

function clearPizzaArray () {
    pizzaArray = [];
}

function buildMenu () {
    switch (level) {
        case 1:
            menuIngredientsArray = ["cheese", "pepperoni"];
            break;
        case 2:
            menuIngredientsArray = ["cheese", "mushrooms", "pepper"];
            break;
        case 3:
            menuIngredientsArray = ["cheese", "pepperoni", "olives", "onion", "basil"];
    }

    menuIngredientsArray.forEach(function(item) {
        menuIngredients += "- " + item + "\n";
    });

    menu = game.add.text(20, 100, menuIngredients, {font: '26px Arial', fill: 'black'});

}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, game.width, game.height, 'redwhite');

// create chef and set his animations
    player = game.add.sprite(100, 450, 'chef'); 
    game.physics.arcade.enable(player);
    player.body.gravity.y = 300; 
    player.body.collideWorldBounds = true;

    player.animations.add('left', true);
    player.animations.add('right', true);
    cursors = game.input.keyboard.createCursorKeys();

// Button to set next level + reset menu
    button = game.add.button(900, 500, 'button', goToNextLevel, this, null);
  
// create menu on screen
    menuText = game.add.text(20, 50, 'MENU',  { font: '40px Arial', fill: 'black' });
    buildMenu();

// Toppings fall from sky
    emitter = game.add.emitter((Math.random() * 600) + 200, -200, 200);
    function Emitter(topping) {
        emitter.makeParticles(topping, [0], 10, true, false);
        emitter.gravity = 100;
        emitter.flow(8000, 1000, 2, 50); // 2 particles emitted every 500ms, each particle will live for 8000ms, will emit 10 particles in total then stop.
        // emitter.on = true;

    }


    // cheese = new Emitter('cheese');
    // pepperoni = new Emitter('pepperoni');

function setToppingsToRain () { 
    switch (level) {
        case 1:
            cheese = new Emitter('cheese');
            pepperoni = new Emitter('pepperoni');
            break;
        case 2:
            cheese = new Emitter('cheese');
            pepperoni = new Emitter('pepperoni');
            mushroom = new Emitter('mushroom');
            pepper = new Emitter('pepper');
            break;
        case 3:
            cheese = new Emitter('cheese');
            pepperoni = new Emitter('pepperoni');
            olives = new Emitter('olives');
            onion = new Emitter('onion');
            basil = new Emitter('basil');
    }
}
    setToppingsToRain();
   
}

function update () {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -400;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 300;
    } else {
        player.animations.stop();
    }
    
    game.physics.arcade.overlap(player, emitter, addToPizza, null, this);

}

function checkWin (){
    // if (menuIngredientsArray === pizzaArray) return true;
    // if (menuIngredientsArray == null || pizzaArray == null) return false;
    // if (menuIngredientsArray.length != pizzaArray.length) return false;

    for (var i = 0; i < menuIngredientsArray.length; i++) {
        if (menuIngredientsArray[i] !== pizzaArray[i]) return false;
    }
    return true;
}

function addToPizza (player, topping) {
    topping.kill();    
    // add green check mark next to cheese menu item

    pizzaArray.push(topping.key);
    console.log(pizzaArray);

    if (checkWin()) {
        alert("Buon Apetito! Press the black button to move to the next level.");
        // pepperoni.on = false;
        // cheese.on = false;
    } else {
        alert("Try again");
    }
}

function goToNextLevel() {
    clearMenu();
    clearPizzaArray();
    level +=1;
    console.log("level is now " + level);
    console.log("Menu now includes " + menuIngredientsArray);
    console.log("Pizza now includes" + pizzaArray)
    // console.log(menuIngredientsArray);
    create();
}

    





// create toppings that fall from sky
    // toppings = game.add.group();
    // toppings.enableBody = true;
    // for ( let i=0; i < 3; i++) {
    //     cheese = toppings.create(i * 200, 0, 'cheese');
    //     cheese.body.gravity.y = 200;
    // }
    // for (let i=0; i < 5; i++) { 
    //     pepperoni = toppings.create(i * 300, 0, 'pepperoni');
    //     pepperoni.body.gravity.y = 50;
    // }
    // for (let i=0; i < 3; i++) { 
    //     mushroom = toppings.create(i * 1500, 0, 'mushroom');
    //     mushroom.body.gravity.y = 80;
    // }
    // for (let i=0; i<5; i++) {
    //     basil = toppings.create(i * 250, 0, 'basil');
    //     basil.body.gravity.y = 150;
    // }
    // for (var i=0; i < 5; i++) { 
    //     onion = toppings.create(i * 250, 0, 'onion');
    //     onion.body.gravity.y = 100;
    // }
    // for (var i=0; i < 5; i++) { 
    //     pepper = toppings.create(i * 350, 0, 'pepper');
    //     pepper.body.gravity.y = 75;
    // }
    // for (var i=0; i < 5; i++) { 
    //     olives = toppings.create(i * 400, 0, 'olives');
    //     olives.body.gravity.y = 100;
    // }

