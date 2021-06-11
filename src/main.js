let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [level1, level2],
}

//define game
let game = new Phaser.Game(config);

// defining keys
// let keyF, KeyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

// gameplay variables

// Volume variables
let volumeMultiplier = 1;