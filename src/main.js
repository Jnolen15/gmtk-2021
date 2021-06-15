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
    scene: [load, menu, sceneManager, level1, narration, endScreen],
}

//define game
let game = new Phaser.Game(config);

// defining keys
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyB, keyN, keyM, keyF, keyR, keyA, keyD, keySPACE;

// gameplay variables
let level = "level1";
let levels = ["level1", "level2", "level3", "level4", "level5", "level6"];
let levelnum = 0;
let tutNumber = 0;

// graphics variables
let playerScale = 0.5;
let gameWidth = 800;
let gameHeight = 600;
let transitioning = false;

// Volume variables
let volumeMultiplier = 1;

// narration variables
let currNarration = "";
let currSubtitles = 0;
let countedDeaths = 0;

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

let subtitleConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    color: 'white',
    align: 'center',
    stroke: 'black',
    strokeThickness: 6,
    fill: 'white',
    padding: {
    top: 5,
    bottom: 5,
    },
    wordWrap: {width: 800, useAdvancedWrap: true},
    fixedWidth: 0
}