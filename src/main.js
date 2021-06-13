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
            debug: false,
            gravity: {y: 0},
        }
    },
    scene: [load, menu, level1, level2],
}

//define game
let game = new Phaser.Game(config);

// defining keys
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyB, keyN;

// gameplay variables

// graphics variables
let playerScale = 0.5;
let gameWidth = 800;
let gameHeight = 600;
let transitioning = false;

// Volume variables
let volumeMultiplier = 1;

// font for the text
let textConfig = {
    fontFamily: 'Monotype Corsiva',
    fontSize: '36px',
    color: '#000',
    stroke: '#000',
    strokeThickness: 2,
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
    width: 100
}