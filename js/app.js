// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 100;
    this.height = 67;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    
    //check if the enemy goes off the screen
    if (this.x > 500) {
        this.x = 0;
    }
    //check collisions
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check Collisions with the player
Enemy.prototype.checkCollisions = function() {
    if (this.x < player.x + 14 + player.width && 
        this.x + this.width > player.x + 14 && 
        (this.y + 77) < player.y + 53 + player.height &&
       this.height + this.y + 77 > player.y + 53) {
        //collision detected
        alert("Collision detected - start over");
        player.resetPlayer();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.width = 74;
    this.height = 88;
};

Player.prototype.update = function() {
    //Check if the player moves off the screen
    if (this.x < 0) {
        this.x = 0;
    } 
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    
    //If the player reaches the water,
    if (this.y < 0) {
        alert("Congrats you won! Let's go again!");
        this.resetPlayer();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // Depending on the key pressed, the player moves 50 paces in that direction
    switch (key) {
        case 'left':
            this.x -= 50;
            break;
        case 'up':
            this.y -= 50;
            break;
        case 'right':
            this.x += 50;
            break;
        case 'down':
            this.y += 50;
            break;
               };
    
    this.update();

};

Player.prototype.resetPlayer = function() {
    //player resets back to a random location
    this.x = Math.floor(Math.random() * (400 - 10 + 50) + 10);
    this.y = 400;
    this.update();
};

// Now instantiate your objects.
// Enemies are placed at the center of each row with a random speed
var enemy1 = new Enemy(10, 60, Math.floor(Math.random() * (100 - 30 + 20) + 30));
var enemy2 = new Enemy(10, 145, Math.floor(Math.random() * (80 - 10 + 20) + 10));
var enemy3 = new Enemy(10, 225, Math.floor(Math.random() * (150 - 20 + 20) + 20));

// Place all enemy objects in an array called allEnemies
var allEnemies = [ enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player(210, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
