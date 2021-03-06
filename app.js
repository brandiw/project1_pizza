var game = new Phaser.Game(window.innerWidth, window.innerHeight - 20, Phaser.arcade, '', { preload: preload, create: create, update: update });

// load images of toppings + chef
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
    game.load.image('tryAgainArrow', 'images/tryAgainArrow.png');
    game.load.image('nextArrow', 'images/nextArrow.png');
}


// create the game
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

    // create menu on screen
    menuText = game.add.text(20, 40, 'MENU',  { font: '35px cursive', fill: 'black' });
    buildMenu();

    toppingsCollectedText = game.add.text(window.innerWidth-400, 40, "TOPPINGS COLLECTED",  { font: '30px cursive', fill: 'black' });

    // Toppings fall from sky
    emitter = game.add.emitter(game.world.centerX, -200, 200);


    setToppingsToRain();
    // writes menu ingredints onto page
    menu = game.add.text(20, 100, menuIngredients, {font: '30px Parisienne, cursive', fill: 'black'});
}

 // give chef ability to move right and left; set the "overlap" function
function update () {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -400;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 400;
    } else {
        player.animations.stop();
    }
    game.physics.arcade.overlap(player, emitter, addToPizza, null, this);
}


// STRETCH GOALS
// tint chef red when he hits unwated topping; tint him green when hits wanted topping
    // - player.tint=16000000 (red)
// Have chef bounce when waiting
// Add topping image to basket once collected
// emit all toppings at once/randomly, not in waves







