let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 0},
        }
    },
    scene: [load, level1, level2],
}

//define game
let game = new Phaser.Game(config);

// defining keys
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyB, keyN;

// gameplay variables

// graphics variables
let playerScale = 0.5;
let gameWidth = 3200;
let gameHeight = 2400;

// Volume variables
let volumeMultiplier = 1;