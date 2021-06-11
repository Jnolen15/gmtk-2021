let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [load, level1, level2],
}

//define game
let game = new Phaser.Game(config);

// defining keys
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;

// gameplay variables

// graphics variables
let playerScale = 0.5;
let gameWidth = 3200;
let gameHeight = 2400;

// Volume variables
let volumeMultiplier = 1;